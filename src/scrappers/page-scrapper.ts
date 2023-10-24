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

  public async scrapPage(): Promise<ScrapResult<T>> {
    try {
      await this.page.goto(this.baseUrl);
      const result = await this.innerScrap();
      const date = new Date().toISOString();
      return {
        date,
        type: this._type,
        status: true,
        result,
      };
    } catch (error) {
      const errorMessage = (error as any).message;
      console.log('Error while scrapping:', errorMessage);
      const date = new Date().toISOString();
      return { date, type: this._type, status: false, error: errorMessage };
    }
  }
}
