import { Page } from 'puppeteer';
import { SourceType, StartParameters } from 'src/models/scrap-parameters';
import { MinfinPageScrapper } from 'src/scrappers/minfin-page-scrapper';
import { OryxPageScrapper } from 'src/scrappers/oryx-page-scrapper';
import { PageScrapperFactory } from 'src/scrappers/page-scrapper.factory';

describe('PageScrapperFactory', () => {
  const mockPage = {} as Page;

  it('should create a MinfinPageScrapper for MOD source', () => {
    const parameters: StartParameters = { source: SourceType.MOD, full: true };
    const scrapper = PageScrapperFactory.create(parameters, mockPage);
    expect(scrapper).toBeInstanceOf(MinfinPageScrapper);
  });

  it('should create an OryxPageScrapper for ORYX source', () => {
    const parameters: StartParameters = { source: SourceType.ORYX };
    const scrapper = PageScrapperFactory.create(parameters, mockPage);
    expect(scrapper).toBeInstanceOf(OryxPageScrapper);
  });

  it('should throw an error for an invalid source', () => {
    const parameters: StartParameters = { source: 'InvalidSource' } as unknown as StartParameters;
    expect(() => PageScrapperFactory.create(parameters, mockPage)).toThrowError('Invalid scrapper type');
  });
});
