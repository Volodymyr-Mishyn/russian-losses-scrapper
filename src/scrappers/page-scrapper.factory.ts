import { Page } from 'puppeteer';
import { OryxTypes, SourceTypes, StartParameters } from '../models/scrap-parameters';
import { MinfinPageScrapper } from './minfin-page-scrapper';
import { PageScrapper } from './page-scrapper';
import { RussianLossesOryxPageScrapper } from './russian-losses-oryx-page-scrapper';
import { UkrainianLossesOryxPageScrapper } from './ukrainian-losses-oryx-page-scrapper';

export class PageScrapperFactory {
  static create(parameters: StartParameters, page: Page): PageScrapper<unknown> {
    const { source } = parameters;
    const { type, full, subType } = source;
    switch (type) {
      case SourceTypes.MOD:
        return new MinfinPageScrapper(page, type, full);
      case SourceTypes.ORYX:
        if (subType) {
          if (subType === OryxTypes.RUSSIA) {
            return new RussianLossesOryxPageScrapper(page, type);
          } else if (subType === OryxTypes.UKRAINE) {
            return new UkrainianLossesOryxPageScrapper(page, type);
          }
        }
        throw new Error(`wrong sub-type for: ${source}`);
      default:
        throw new Error(`No scrapper for provided type: ${source}`);
    }
  }
}
