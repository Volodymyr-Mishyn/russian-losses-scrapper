import { OryxScrapResult } from '../models/scrap-results/oryx-scrap-result';
import { OryxPageScrapper } from './oryx-page-scrapper';

export class RussianLossesOryxPageScrapper extends OryxPageScrapper {
  protected baseUrl: string = 'https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html';
  protected scrapContainerData(): Promise<OryxScrapResult> {
    return this.page.$$eval('div.post-body.entry-content', (container: Array<Element>) => {
      if (container.length === 0 || container.length > 1) {
        return null;
      }
      const lastDiv = [...container[0].children].at(-1);
      if (!lastDiv) {
        return null;
      }
      const infoList = [...lastDiv.children];
      const result: any = {
        title: '',
        entities: [],
      };
      let index = 0;
      const H3_TAG = 'H3';
      const UL_TAG = 'UL';
      const P_TAG = 'P';
      const length = infoList.length;
      while (index < length - 1) {
        const currentElement = infoList[index];
        const nextElement = infoList[index + 1];

        if (currentElement?.tagName === H3_TAG) {
          if (nextElement?.tagName === UL_TAG) {
            result.entities.push({
              summary: currentElement.textContent,
              list: [...nextElement.children].map((liElement) => liElement.innerHTML),
            });
            index++;
          } else if (nextElement?.tagName === P_TAG) {
            result.title = currentElement.textContent;
          }
        }
        index++;
      }
      return result;
    });
  }
}
