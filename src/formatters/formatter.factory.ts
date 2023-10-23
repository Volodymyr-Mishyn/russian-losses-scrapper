import { OryxScrapResult } from 'src/models/scrap-results/oryx-scrap-result';
import { SourceType } from '../models/scrap-parameters';
import { MODScrapResult } from '../models/scrap-results/mod-scrap-result';
import { ScrapResult } from '../models/scrap-results/scrap-result';
import { DefaultFormatter } from './default-formatter';
import { Formatter } from './formatter';
import { MODFormatter } from './mod-formatter';
import { OryxFormatter } from './oryx-formatter';

export class FormatterFactory {
  static create(scrappedData: ScrapResult<unknown>): Formatter<unknown, unknown> {
    const { result, type } = scrappedData;
    switch (type) {
      case SourceType.MOD:
        return new MODFormatter(result as MODScrapResult);
      case SourceType.ORYX:
        return new OryxFormatter(result as OryxScrapResult);
      default:
        return new DefaultFormatter(result);
    }
  }
}
