import { DefaultFormatter } from 'src/formatters/default-formatter';
import { FormatterFactory } from 'src/formatters/formatter.factory';
import { MODFormatter } from 'src/formatters/mod-formatter';
import { OryxFormatter } from 'src/formatters/oryx-formatter';
import { SourceType } from 'src/models/scrap-parameters';
import { MODScrapResult } from 'src/models/scrap-results/mod-scrap-result';
import { OryxScrapResult } from 'src/models/scrap-results/oryx-scrap-result';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';

describe('FormatterFactory', () => {
  it('should create a MODFormatter for MOD source type', () => {
    const scrappedData: ScrapResult<MODScrapResult> = {
      result: {} as MODScrapResult,
      type: SourceType.MOD,
      date: '',
    };
    const formatter = FormatterFactory.create(scrappedData);
    expect(formatter).toBeInstanceOf(MODFormatter);
  });

  it('should create an OryxFormatter for ORYX source type', () => {
    const scrappedData: ScrapResult<OryxScrapResult> = {
      result: {} as OryxScrapResult,
      type: SourceType.ORYX,
      date: '',
    };
    const formatter = FormatterFactory.create(scrappedData);
    expect(formatter).toBeInstanceOf(OryxFormatter);
  });

  it('should create a DefaultFormatter for an unknown source type', () => {
    const scrappedData: ScrapResult<unknown> = {
      result: {},
      type: 'UnknownSourceType' as SourceType,
      date: '',
    };
    const formatter = FormatterFactory.create(scrappedData);
    expect(formatter).toBeInstanceOf(DefaultFormatter);
  });
});
