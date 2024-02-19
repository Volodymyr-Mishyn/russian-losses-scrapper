import { Page } from 'puppeteer';
import { PageScrapper } from './page-scrapper';
import { delay } from '../_helpers/delay';
import { MODDayScrapResult, MODScrapResult } from '../models/scrap-results/mod-scrap-result';
import { Source } from '../models/scrap-parameters';

export class MinfinPageScrapper extends PageScrapper<MODScrapResult> {
  protected baseUrl: string = 'https://index.minfin.com.ua/en/russian-invading/casualties/';

  constructor(
    page: Page,
    private type: Source,
    private _full = false,
  ) {
    super(page, type);
  }

  private async _openMonthsLinks() {
    const links = await this.page.$$('div.ajaxmonth a');
    for (let link of links) {
      await delay(500);
      link.scrollIntoView();
      await link.click();
      await delay(500);
    }
  }

  private async _scrapAllData(): Promise<Array<MODDayScrapResult>> {
    await this.page.waitForSelector('ul.see-also', { timeout: 60000 });
    return this.page.$$eval(
      'ul.see-also > li.gold',
      (elements: Array<Element>) =>
        elements
          .map((element) => {
            const dateElement = element.querySelector('span.black');
            if (!dateElement || !dateElement.textContent) {
              return null;
            }
            const casualtiesElements = element.querySelectorAll('div.casualties ul li');
            if (!casualtiesElements) {
              return null;
            }
            const casualties = [...casualtiesElements].map((casualtiesElement) => casualtiesElement.textContent);
            return { date: dateElement.textContent, casualties };
          })
          .filter((element) => element !== null) as Array<MODDayScrapResult>,
    );
  }

  protected async innerScrap(): Promise<MODScrapResult> {
    await this.page.waitForSelector('#idx-content', { timeout: 60000 });
    if (this._full) {
      await this._openMonthsLinks();
    }
    return this._scrapAllData();
  }
}
