import { PageScrapper } from "./page-scrapper";

export class OryxPageScrapper extends PageScrapper {
  protected baseUrl: string =
    "https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html";

  protected async innerScrap(): Promise<void> {
    await this.page.waitForSelector("div.post-body.entry-content");
    const equipmentLossContainer = await this.page.$$eval(
      "div.post-body.entry-content",
      (divs: Array<Element>) => {
        const lastDiv = divs.at(-1);
        return lastDiv?.textContent;
      }
    );
    if (!equipmentLossContainer) {
      return;
    }
  }
}
