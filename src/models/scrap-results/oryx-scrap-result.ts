import { ScrapResult } from "./scrap-result";

export interface ORYXScrapResult {
  title: string;
  entities: Array<{ summary: string; list: Array<string> }>;
}
