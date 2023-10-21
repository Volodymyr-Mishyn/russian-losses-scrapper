import { SourceType } from "../models/scrap-parameters";
import { MODScrapResult } from "../models/scrap-results/mod-scrap-result";
import { ScrapResult } from "../models/scrap-results/scrap-result";
import { DefaultFormatter } from "./default-formatter";
import { Formatter } from "./formatter";
import { MODFormatter } from "./mod-formatter";

export class FormatterFactory {
  static create(
    scrappedData: ScrapResult<unknown>
  ): Formatter<unknown, unknown> {
    const { result, type } = scrappedData;
    switch (type) {
      case SourceType.MOD:
        return new MODFormatter(result as MODScrapResult);
      default:
        return new DefaultFormatter(result);
    }
  }
}
