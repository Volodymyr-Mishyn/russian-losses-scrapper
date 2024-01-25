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
  ['damaged and abanonded', 'damagedAndAbandoned'],
  ['captured and destroyed', 'destroyed'],
  ['abandoned and destroyed', 'destroyed'],
  ['captured and later destroyed', 'destroyed'],
  ['abandoned and later destroyed', 'destroyed'],
  ['captured and stripped', 'captured'],
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
    const titleLower = title.toLowerCase();
    const totalRegex = /(\d+), of which/;
    const destroyedRegex = /destroyed:\s*(\d+)/;
    const damagedRegex = /damaged:\s*(\d+)/;
    const abandonedRegex = /abandoned:\s*(\d+)/;
    const capturedRegex = /captured:\s*(\d+)/;

    const findNumber = (pattern: RegExp): number => {
      const match = titleLower.match(pattern);
      return match ? this._processStringNumber(match[1]) : 0;
    };
    const a = {
      count: findNumber(totalRegex),
      destroyed: findNumber(destroyedRegex),
      damaged: findNumber(damagedRegex),
      abandoned: findNumber(abandonedRegex),
      captured: findNumber(capturedRegex),
    };
    return a;
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
    let numbers = text.match(/\d+/g);
    if (numbers && numbers?.length > 0) {
      oryxEntity[categoryKey].count = oryxEntity[categoryKey].count + numbers.length;
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
