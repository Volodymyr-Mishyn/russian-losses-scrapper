import { OryxEntityType, OryxFormatResult, OryxStat, OryxStatRoot } from '../models/format-results/oryx-format-result';
import { OryxScrapResult } from '../models/scrap-results/oryx-scrap-result';
import { Formatter } from './formatter';
import * as cheerio from 'cheerio';

const categoryToActual: Array<[string, string]> = [
  ['destroyed', 'destroyed'],
  ['damaged', 'damaged'],
  ['captured', 'captured'],
  ['abandoned', 'abandoned'],
  ['damagedAndCaptured', 'damaged and captured'],
  ['damagedAndAbandoned', 'damaged and abandoned'],
];
const categoryMap = new Map<string, string>(categoryToActual);
//TODO: finish this class
export class OryxFormatter extends Formatter<OryxScrapResult, OryxFormatResult> {
  private _processTitleName(title: string): string {
    const nameRegex = /(.+?)\s+-/;
    const nameMatch = title.match(nameRegex);
    if (!nameMatch || !nameMatch[1]) {
      throw new Error('Name not found.');
    }
    return nameMatch[1].trim();
  }

  private _processTitleStat(title: string): OryxStat {
    const statsRegex = /(\d+)/g;
    const statsMatches = title.match(statsRegex);
    if (!statsMatches || statsMatches.length < 5) {
      throw new Error('Statistics not found');
    }
    return {
      all: parseInt(statsMatches[0], 10),
      destroyed: parseInt(statsMatches[1], 10),
      damaged: parseInt(statsMatches[2], 10),
      abandoned: parseInt(statsMatches[3], 10),
      captured: parseInt(statsMatches[4], 10),
    };
  }

  private _processTitle(title: string): OryxStatRoot {
    return {
      name: this._processTitleName(title),
      statistics: this._processTitleStat(title),
    };
  }

  protected innerFormat(): Promise<OryxFormatResult> {
    throw new Error('Method not implemented.');
  }
}
