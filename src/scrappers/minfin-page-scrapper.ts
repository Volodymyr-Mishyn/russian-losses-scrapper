import { Page } from "puppeteer";
import { PageScrapper } from "./page-scrapper";
import { delay } from "../_helpers/delay";

interface RawCasualtiesData {
  date: string;
  casualties: Array<string>;
}

export class MinfinPageScrapper extends PageScrapper {
  protected baseUrl: string =
    "https://index.minfin.com.ua/en/russian-invading/casualties/";

  constructor(page: Page, private _full = false) {
    super(page);
  }

  private async _openMonthsLinks() {
    const links = await this.page.$$("div.ajaxmonth a");
    for (let link of links) {
      await delay(250);
      await link.click();
      await this.page.waitForNetworkIdle();
    }
  }

  private async _scrapAllData(): Promise<Array<RawCasualtiesData>> {
    await this.page.waitForSelector("ul.see-also");
    return this.page.$$eval(
      "ul.see-also > li.gold",
      (elements: Array<Element>) =>
        elements
          .map((element) => {
            const dateElement = element.querySelector("span.black");
            if (!dateElement || !dateElement.textContent) {
              return null;
            }
            const casualtiesElements = element.querySelectorAll(
              "div.casualties ul li"
            );
            if (!casualtiesElements) {
              return null;
            }
            const casualties = [...casualtiesElements].map(
              (casualtiesElement) => casualtiesElement.textContent
            );
            return { date: dateElement.textContent, casualties };
          })
          .filter((element) => element !== null) as Array<RawCasualtiesData>
    );
  }

  protected async innerScrap(): Promise<void> {
    await this.page.waitForSelector("#idx-content");
    if (this._full) {
      await this._openMonthsLinks();
    }
    const info = await this._scrapAllData();
    console.log(info);
  }
}
