import { Page } from 'puppeteer';
import { SourceType, StartParameters } from '../models/scrap-parameters';
import { MinfinPageScrapper } from './minfin-page-scrapper';
import { PageScrapper } from './page-scrapper';
import { OryxPageScrapper } from './oryx-page-scrapper';

export class PageScrapperFactory {
  static create(parameters: StartParameters, page: Page): PageScrapper<unknown> {
    const { source, full } = parameters;
    switch (source) {
      case SourceType.MOD:
        return new MinfinPageScrapper(page, source, full);
      case SourceType.ORYX:
        return new OryxPageScrapper(page, source);
      default:
        throw new Error('Invalid scrapper type');
    }
  }
}
