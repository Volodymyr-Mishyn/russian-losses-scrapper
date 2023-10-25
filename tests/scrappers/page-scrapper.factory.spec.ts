import { Page } from 'puppeteer';
import { OryxTypes, SourceTypes, StartParameters } from 'src/models/scrap-parameters';
import { MinfinPageScrapper } from 'src/scrappers/minfin-page-scrapper';
import { OryxPageScrapper } from 'src/scrappers/oryx-page-scrapper';
import { PageScrapperFactory } from 'src/scrappers/page-scrapper.factory';
import { RussianLossesOryxPageScrapper } from 'src/scrappers/russian-losses-oryx-page-scrapper';
import { UkrainianLossesOryxPageScrapper } from 'src/scrappers/ukrainian-losses-oryx-page-scrapper';

describe('PageScrapperFactory', () => {
  const mockPage = {} as Page;

  describe('when type is MOD', () => {
    it('should create a MinfinPageScrapper', () => {
      const parameters: StartParameters = {
        source: { type: SourceTypes.MOD, full: true },
      } as unknown as StartParameters;
      const scrapper = PageScrapperFactory.create(parameters, mockPage);
      expect(scrapper).toBeInstanceOf(MinfinPageScrapper);
    });
  });

  describe('when source is ORYX', () => {
    it('should create an UkraineLossesOryxPageScrapper for Ukraine', () => {
      const parameters: StartParameters = {
        source: { type: SourceTypes.ORYX, subType: OryxTypes.UKRAINE },
      } as unknown as StartParameters;
      const scrapper = PageScrapperFactory.create(parameters, mockPage);
      expect(scrapper).toBeInstanceOf(UkrainianLossesOryxPageScrapper);
    });
    it('should create an RussianLossesOryxPageScrapper for Ukraine', () => {
      const parameters: StartParameters = {
        source: { type: SourceTypes.ORYX, subType: OryxTypes.RUSSIA },
      } as unknown as StartParameters;
      const scrapper = PageScrapperFactory.create(parameters, mockPage);
      expect(scrapper).toBeInstanceOf(RussianLossesOryxPageScrapper);
    });
    it('should throw an error for an invalid sub type', () => {
      const parameters: StartParameters = {
        source: { type: SourceTypes.ORYX, subType: 'InvalidSubType' },
      } as unknown as StartParameters;
      expect(() => PageScrapperFactory.create(parameters, mockPage)).toThrowError();
    });
  });

  it('should throw an error for an invalid source', () => {
    const parameters: StartParameters = { source: { type: 'InvalidSource' } } as unknown as StartParameters;
    expect(() => PageScrapperFactory.create(parameters, mockPage)).toThrowError();
  });
});
