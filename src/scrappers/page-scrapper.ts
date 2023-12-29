import { Page } from 'puppeteer';
import { ScrapResult } from '../models/scrap-results/scrap-result';
import { Source } from '../models/scrap-parameters';
import { Logger } from '../_helpers/logger';

export abstract class PageScrapper<T> {
  protected abstract baseUrl: string;
  protected page: Page;
  constructor(
    page: Page,
    private _type: Source,
  ) {
    this.page = page;
  }
  protected abstract innerScrap(): Promise<T>;

  public async scrapPage(): Promise<ScrapResult<T>> {
    try {
      this.page.on('console', (msg) => Logger.getInstance().info(`PAGE LOG: ${msg.text()}`));
      Logger.getInstance().info('attempting to go to page');
      await this.page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });
      Logger.getInstance().info('navigation complete. Scrapping...');
      const result = await this.innerScrap();
      Logger.getInstance().info('Scrapping complete: ' + `${JSON.stringify(result).length}`);
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
      Logger.getInstance().error('Error while scrapping: ' + errorMessage);
      const date = new Date().toISOString();
      return { date, type: this._type, status: false, error: errorMessage };
    }
  }
}
