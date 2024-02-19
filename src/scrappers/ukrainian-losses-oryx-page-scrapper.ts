import { OryxScrapResult } from '../models/scrap-results/oryx-scrap-result';
import { OryxPageScrapper } from './oryx-page-scrapper';

export class UkrainianLossesOryxPageScrapper extends OryxPageScrapper {
  protected baseUrl: string = 'https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-ukrainian.html';

  protected async scrapContainerData(): Promise<OryxScrapResult> {
    return this.page.$$eval('div.post-body.entry-content', (container: Array<Element>) => {
      if (container.length === 0 || container.length > 1) {
        return null;
      }
      const lastDiv = [...container[0].children].at(-1);
      if (!lastDiv) {
        return null;
      }
      const H3_TAG = 'H3';
      const UL_TAG = 'UL';
      const DIV_TAG = 'DIV';
      function traverseList(list: Array<Element>, resultObject: any) {
        let index = 0;
        const length = list.length;
        while (index < length - 1) {
          const currentElement = list[index];
          const nextElement = list[index + 1];
          if (currentElement?.tagName === H3_TAG) {
            if (nextElement?.tagName === UL_TAG) {
              resultObject.entities.push({
                summary: currentElement.textContent,
                list: [...nextElement.children].map((liElement) => liElement.innerHTML),
              });
              index++;
            } else if (nextElement?.tagName === DIV_TAG) {
              if (nextElement?.children?.length >= 2) {
                traverseList([...nextElement.children], resultObject);
              } else {
                resultObject.title = currentElement.textContent;
              }
            }
          } else if (currentElement?.tagName === DIV_TAG) {
            if (currentElement.children && currentElement.children[0]?.tagName === H3_TAG) {
              traverseList([...currentElement.children], resultObject);
            }
          }
          index++;
        }
      }
      let infoList: Array<Element> = [];
      if (lastDiv.children.length === 1 && lastDiv.children[0].tagName === DIV_TAG) {
        infoList = [...lastDiv.children[0].children];
      }
      const result: any = {
        title: '',
        entities: [],
      };
      traverseList(infoList, result);
      // debugger;
      return result;
    });
  }
}
