import { Page } from 'puppeteer';
import { ScrapResult } from '../models/scrap-results/scrap-result';
import { Source } from '../models/scrap-parameters';

export abstract class PageScrapper<T> {
  protected abstract baseUrl: string;
  protected page: Page;
  constructor(page: Page, private _type: Source) {
    this.page = page;
  }
  protected abstract innerScrap(): Promise<T>;

  public async scrapPage(): Promise<ScrapResult<T> | null> {
    try {
      await this.page.goto(this.baseUrl);
      const date = new Date().toISOString();
      const result = await this.innerScrap();
      return {
        date,
        type: this._type,
        result,
      };
    } catch (e) {
      console.log('Error while scrapping:', e);
      return null;
    }
  }
}
