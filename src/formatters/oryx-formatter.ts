import { OryxScrapResult } from "../models/scrap-results/oryx-scrap-result";
import { Formatter } from "./formatter";

export class OryxFormatter extends Formatter<OryxScrapResult, unknown> {
  protected innerFormat(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
