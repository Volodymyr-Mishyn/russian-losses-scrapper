import { OryxScrapResult } from '../models/scrap-results/oryx-scrap-result';
import { PageScrapper } from './page-scrapper';

export abstract class OryxPageScrapper extends PageScrapper<OryxScrapResult> {
  protected abstract scrapContainerData(): Promise<OryxScrapResult>;

  protected async innerScrap(): Promise<OryxScrapResult> {
    await this.page.waitForSelector('div.post-body.entry-content');
    return this.scrapContainerData();
  }
}
