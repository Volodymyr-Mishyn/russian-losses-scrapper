import {
  OryxDetailedEntity,
  OryxDetailedEntityInfo,
  OryxEntityType,
  OryxFormatResult,
  OryxStat,
  OryxStatRoot,
} from '../models/format-results/oryx-format-result';
import { OryxEntityTypeScrapResult, OryxScrapResult } from '../models/scrap-results/oryx-scrap-result';
import { Formatter } from './formatter';
import * as cheerio from 'cheerio';

const categoryToActual: Array<[string, keyof OryxDetailedEntityInfo]> = [
  ['destroyed', 'destroyed'],
  ['damaged', 'damaged'],
  ['captured', 'captured'],
  ['abandoned', 'abandoned'],
  ['damaged and captured', 'damagedAndCaptured'],
  ['damaged and abandoned', 'damagedAndAbandoned'],
];
const categoryMap = new Map<string, keyof OryxDetailedEntityInfo>(categoryToActual);
export class OryxFormatter extends Formatter<OryxScrapResult, OryxFormatResult> {
  private _processStringNumber(number: string): number {
    if (!number) {
      return 0;
    }
    return parseInt(number, 10);
  }

  private _processTitleName(title: string): string {
    const nameRegex = /(.*?)\s[-(]/;
    const nameMatch = title.match(nameRegex);
    if (!nameMatch || !nameMatch[1]) {
      throw new Error('Name not found in the input string.');
    }
    return nameMatch[1].trim();
  }

  private _processTitleStat(title: string): OryxStat {
    const statsRegex = /(\d+)/g;
    const statsMatches = title.match(statsRegex);
    if (!statsMatches || statsMatches.length < 1) {
      throw new Error('Statistics not found');
    }
    return {
      count: this._processStringNumber(statsMatches[0]),
      destroyed: this._processStringNumber(statsMatches[1]),
      damaged: this._processStringNumber(statsMatches[2]),
      abandoned: this._processStringNumber(statsMatches[3]),
      captured: this._processStringNumber(statsMatches[4]),
    };
  }

  private _processTitle(title: string): OryxStatRoot {
    return {
      name: this._processTitleName(title),
      statistics: this._processTitleStat(title),
    };
  }

  private _extractCountAndName(text: string): { count: number; name: string } | null {
    const match = text.match(/^(\d+) (.+):$/);
    if (match) {
      const count = parseInt(match[1], 10);
      const name = match[2];
      return { count, name };
    }
    return null;
  }

  private _processLinkContent(text: string, link: string, oryxEntity: OryxDetailedEntity): void {
    const textWithoutBracers = text.replaceAll('(', '').replaceAll(')', '');
    const splitString = textWithoutBracers.split(',');
    const category = splitString.pop()?.trim();
    if (!category) {
      return;
    }
    const categoryKey: keyof OryxDetailedEntityInfo | undefined = categoryMap.get(category);
    if (!categoryKey) {
      return;
    }
    if (link) {
      oryxEntity[categoryKey].list.push(link);
    }
    let numbers = splitString.join().match(/\d+/g);
    if (numbers && numbers?.length > 0) {
      const maxValue = numbers.at(-1) || '0';
      const numberValue = this._processStringNumber(maxValue);
      if (oryxEntity[categoryKey].count < numberValue) {
        oryxEntity[categoryKey].count = numberValue;
      }
    }
  }

  private _processEntityListElement(source: string): OryxDetailedEntity | null {
    const oryxEntity: OryxDetailedEntity = {
      name: '',
      count: 0,
      destroyed: { count: 0, list: [] },
      damaged: { count: 0, list: [] },
      captured: { count: 0, list: [] },
      abandoned: { count: 0, list: [] },
      damagedAndCaptured: { count: 0, list: [] },
      damagedAndAbandoned: { count: 0, list: [] },
    };
    const $ = cheerio.load(`<div>${source}</div>`);
    const extractedText = $('div')
      .contents()
      .filter((_, node) => {
        return node.type === 'text' && $(node).prev().is('img');
      })
      .text()
      .trim();
    const countAndNameMatch = this._extractCountAndName(extractedText);
    if (!countAndNameMatch) {
      return null;
    }
    const { count, name } = countAndNameMatch;
    oryxEntity.name = name;
    oryxEntity.count = count;
    const detailElements = $('a');
    detailElements.toArray().forEach((linkElement) => {
      const text = $(linkElement).text().toLowerCase() || '';
      const link = $(linkElement).attr('href') || '';
      this._processLinkContent(text, link, oryxEntity);
    });
    return oryxEntity;
  }

  private _processEntityType(entityType: OryxEntityTypeScrapResult): OryxEntityType {
    const { name, statistics } = this._processTitle(entityType.summary);
    return {
      name,
      statistics,
      details: entityType.list
        .map((element) => this._processEntityListElement(element))
        .filter((result) => !!result) as Array<OryxDetailedEntity>,
    };
  }

  protected innerFormat(): Promise<OryxFormatResult> {
    const titleFormatted = this._processTitle(this.data.title);
    const entitiesFormatted = this.data.entities.map((entityType) => this._processEntityType(entityType));
    return Promise.resolve({ ...titleFormatted, entities: entitiesFormatted });
  }
}
