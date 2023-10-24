import { Page } from 'puppeteer';
import { delay } from 'src/_helpers/delay';
import { SourceTypes } from 'src/models/scrap-parameters';
import { MinfinPageScrapper } from 'src/scrappers/minfin-page-scrapper';

class MockPage {
  async $$() {
    return [{ click: jest.fn, scrollIntoView: jest.fn }];
  }

  async $$eval(selector: string, pageFunction: (elements: Array<Element>) => any) {
    return pageFunction([]);
  }

  async waitForSelector(selector: string) {
    if (selector === 'ul.see-also') {
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

describe('MinfinPageScrapper', () => {
  let page: MockPage;
  const source = SourceTypes.MOD;
  beforeEach(() => {
    page = new MockPage();
  });
  describe('scrapPage', () => {
    const realDate = Date;
    const mockDate = new Date('2023-01-01T12:00:00Z');
    beforeEach(() => {
      global.Date = class extends realDate {
        constructor() {
          super();
          return mockDate;
        }
      } as any;
    });

    afterEach(() => {
      global.Date = realDate;
    });
    describe('when scrapping succeeds', () => {
      it('should return date and type of scrapping', async () => {
        const scrapper = new MinfinPageScrapper(page as unknown as Page, source, true);
        const result = await scrapper.scrapPage();
        expect(result?.date).toEqual('2023-01-01T12:00:00.000Z');
        expect(result?.type).toEqual(source);
      });
      describe('when full scrapping', () => {
        const link = { click: jest.fn, scrollIntoView: jest.fn };
        beforeEach(() => {
          jest.spyOn(link, 'click');
          jest.spyOn(link, 'scrollIntoView');
          jest.spyOn(page, '$$').mockImplementation(async () => [link]);
        });
        it('should open all inner links', async () => {
          const scrapper = new MinfinPageScrapper(page as unknown as Page, source, true);
          await scrapper.scrapPage();
          expect(link.click).toHaveBeenCalledTimes(1);
          expect(link.scrollIntoView).toHaveBeenCalledTimes(1);
        });
      });

      describe('when selection returns valid data', () => {
        const element = {
          querySelector() {
            return { textContent: 'some date' };
          },
          querySelectorAll() {
            return [{ textContent: 'test casualties' }];
          },
        };
        beforeEach(() => {
          jest.spyOn(page, '$$eval').mockImplementation(async (selector: string, pageFunction) => {
            return pageFunction([element as unknown as Element]);
          });
        });
        it('should receive scrapped page content', async () => {
          const scrapper = new MinfinPageScrapper(page as unknown as Page, source, true);
          const result = await scrapper.scrapPage();
          expect(result?.result).toEqual([{ casualties: ['test casualties'], date: 'some date' }]);
        });
      });
    });
    describe('when scrapping errors out', () => {
      it('should handle error and wrap it in object', async () => {
        const consoleWarnMock = jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(page, 'waitForSelector').mockRejectedValue(new Error('An error occurred'));
        const scrapper = new MinfinPageScrapper(page as unknown as Page, source, true);
        const result = await scrapper.scrapPage();
        expect(console.log).toHaveBeenCalledWith(expect.any(String), 'An error occurred');
        expect(result).toEqual({
          date: '2023-01-01T12:00:00.000Z',
          error: 'An error occurred',
          status: false,
          type: 'mod',
        });
        consoleWarnMock.mockRestore();
      });
    });
  });
});
