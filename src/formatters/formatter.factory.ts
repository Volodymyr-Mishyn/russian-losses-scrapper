import { SourceType } from "../models/scrap-parameters";
import { MODScrapResult } from "../models/scrap-results/mod-scrap-result";
import { ScrapResult } from "../models/scrap-results/scrap-result";
import { Formatter } from "./formatter";
import { MODFormatter } from "./mod-formatter";

export class FormatterFactory {
  static create(
    scrappedData: ScrapResult<unknown>
  ): Formatter<unknown, unknown> {
    const { result, type } = scrappedData;
    console.log(result);
    switch (type) {
      case SourceType.MOD:
        return new MODFormatter(result as MODScrapResult);
      default:
        throw new Error("Invalid scrapper type");
    }
  }
}
