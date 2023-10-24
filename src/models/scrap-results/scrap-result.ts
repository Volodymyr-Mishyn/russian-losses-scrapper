import { Source } from '../scrap-parameters';
export type ScrapStatus = boolean;
export interface ScrapResult<T> {
  date: string;
  type: Source;
  status: ScrapStatus;
  error?: string;
  result?: T;
}
