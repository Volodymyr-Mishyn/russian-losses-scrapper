import { ORYXScrapResult } from "../models/scrap-results/oryx-scrap-result";
import { PageScrapper } from "./page-scrapper";

export class OryxPageScrapper extends PageScrapper<ORYXScrapResult> {
  protected baseUrl: string =
    "https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html";

  protected async innerScrap(): Promise<ORYXScrapResult> {
    await this.page.waitForSelector("div.post-body.entry-content");
    return await this.page.$$eval(
      "div.post-body.entry-content",
      (container: Array<Element>) => {
        if (container.length > 1) {
          return null;
        }
        const lastDiv = [...container[0].children].at(-1);
        if (!lastDiv) {
          return null;
        }
        const infoList = [...lastDiv.children];
        const result: any = {
          title: "",
          entities: [],
        };
        let index = 0;
        const H3_TAG = "H3";
        const UL_TAG = "UL";
        const length = infoList.length;

        while (index < length - 1) {
          const currentElement = infoList[index];
          const nextElement = infoList[index + 1];

          if (currentElement?.tagName === H3_TAG) {
            if (nextElement?.tagName === UL_TAG) {
              result.entities.push({
                summary: currentElement.textContent,
                list: nextElement.innerHTML,
              });
              index++;
            } else {
              result.title = currentElement.textContent;
            }
          }

          index++;
        }
        return result;
      }
    );
  }
}
