import { Source } from "../scrap-parameters";

export interface ScrapResult<T> {
  date: string;
  type: Source;
  result: T;
}
