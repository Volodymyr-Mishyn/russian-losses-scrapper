import { toISOString } from "../_helpers/date";
import {
  MODDayFormatResult,
  MODEntityLoss,
  MODFormatResult,
} from "../models/format-results/mod-format-result";
import {
  MODDayScrapResult,
  MODScrapResult,
} from "../models/scrap-results/mod-scrap-result";
import { Formatter } from "./formatter";

export class MODFormatter extends Formatter<MODScrapResult, MODFormatResult> {
  private _processSingleCasualty(casualty: string): MODEntityLoss | null {
    const match = casualty.match(/^(.*?)\s*—\s*(\d+)\s*(\(\+(\d+)\))?/);
    if (!match) {
      return null;
    }
    const [, name, totalStr, , incrementStr] = match;
    const total = parseInt(totalStr, 10);
    const increment = incrementStr ? parseInt(incrementStr, 10) : 0;
    return { name, total, increment };
  }

  private _processSingleDay(
    dayData: MODDayScrapResult
  ): MODDayFormatResult | null {
    const date = toISOString(dayData.date);
    if (!date) {
      return null;
    }
    return {
      date,
      casualties: dayData.casualties
        .map((element) => this._processSingleCasualty(element))
        .filter((processedData) => !!processedData) as Array<MODEntityLoss>,
    };
  }

  private _processData(): MODFormatResult {
    return this.data
      .map((dayData) => this._processSingleDay(dayData))
      .filter((resultDayData) => !!resultDayData) as MODFormatResult;
  }

  protected innerFormat(): Promise<MODFormatResult> {
    return Promise.resolve(this._processData());
  }
}
