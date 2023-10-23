import { Page } from 'puppeteer';
import { delay } from 'src/_helpers/delay';
import { SourceType } from 'src/models/scrap-parameters';
import { OryxPageScrapper } from 'src/scrappers/oryx-page-scrapper';

class MockPage {
  async $$() {
    return [{ click: jest.fn }];
  }

  async $$eval(selector: string, pageFunction: (elements: Array<Element>) => any) {
    return pageFunction([]);
  }

  async waitForSelector(selector: string) {
    if (selector === 'div.post-body.entry-content') {
      await delay(0);
    }
  }

  async waitForNetworkIdle() {
    await delay(0);
  }
  async goto() {
    await delay(0);
  }
}

describe('OryxPageScrapper', () => {
  let page: MockPage;
  const source = SourceType.ORYX;
  beforeEach(() => {
    page = new MockPage();
  });
  describe('scrapPage', () => {
    describe('when valid page data', () => {
      const containerLastChild = {
        children: [
          { tagName: 'H3', textContent: 'Test title!' },
          { tagName: 'P' },
          { tagName: 'H3', textContent: 'Entity title' },
          { tagName: 'UL', children: [{ innerHTML: 'One test' }, { innerHTML: 'Two test' }] },
        ],
      };
      const container = {
        children: [null, containerLastChild],
      };
      beforeEach(() => {
        jest.spyOn(page, '$$eval').mockImplementation(async (selector, pageFunction) => {
          if (selector === 'div.post-body.entry-content') {
            return await pageFunction([container as unknown as Element]);
          }
        });
      });
      it('should scrap data from page', async () => {
        const scrapper = new OryxPageScrapper(page as unknown as Page, source);
        const result = await scrapper.scrapPage();
        expect(result?.result).toEqual({
          entities: [{ list: ['One test', 'Two test'], summary: 'Entity title' }],
          title: 'Test title!',
        });
      });
    });
    describe('when invalid page data', () => {
      it('should return null', async () => {
        const scrapper = new OryxPageScrapper(page as unknown as Page, source);
        const result = await scrapper.scrapPage();
        expect(result?.result).toBeNull();
      });
    });
  });
});
