import { Page } from "puppeteer";
import { SourceType, StartParameters } from "../models/start-parameters";
import { MinfinPageScrapper } from "./minfin-page-scrapper";
import { PageScrapper } from "./page-scrapper";
import { OryxPageScrapper } from "./oryx-page-scrapper";

export class PageScrapperFactory {
  static create(parameters: StartParameters, page: Page): PageScrapper {
    switch (parameters.source) {
      case SourceType.MOD:
        return new MinfinPageScrapper(page, parameters.full);
      case SourceType.ORYX:
        return new OryxPageScrapper(page);
      default:
        throw new Error("Invalid scrapper type");
    }
  }
}
