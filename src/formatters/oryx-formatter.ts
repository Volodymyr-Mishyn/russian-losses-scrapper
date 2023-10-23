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

export class OryxFormatter extends Formatter<OryxScrapResult, OryxFormatResult> {
  protected innerFormat(): Promise<OryxFormatResult> {
    throw new Error('Method not implemented.');
  }
}
