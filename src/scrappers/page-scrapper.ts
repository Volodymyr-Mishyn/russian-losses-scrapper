import { Page } from 'puppeteer';
import { ScrapResult } from '../models/scrap-results/scrap-result';
import { Source } from '../models/scrap-parameters';
import { Logger } from '../_helpers/logger';

export abstract class PageScrapper<T> {
  protected abstract baseUrl: string;
  protected page: Page;
  constructor(page: Page, private _type: Source) {
    this.page = page;
  }
  protected abstract innerScrap(): Promise<T>;

  public async scrapPage(): Promise<ScrapResult<T>> {
    try {
      const logMap = new Map();
      this.page.on('console', (msg) => {
        const logText = `PAGE LOG: ${msg.text()}`;
        if (logMap.has(logText)) {
          logMap.set(logText, logMap.get(logText) + 1);
        } else {
          logMap.set(logText, 1);
        }
      });
      Logger.getInstance().info('attempting to go to page');
      await this.page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 90000,
      });
      Logger.getInstance().info('navigation complete. Scrapping...');
      const result = await this.innerScrap();
      Logger.getInstance().info('Logs of page:');
      logMap.forEach((count, logText) => {
        console.log(`${logText} (${count})`);
      });
      // Logger.getInstance().info('result: ' + JSON.stringify(result));
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
