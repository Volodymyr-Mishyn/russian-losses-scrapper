import { Source } from '../scrap-parameters';

export type OutputStatus = boolean;
export interface OutputResult {
  date: string;
  type: Source;
  data?: unknown;
}

export interface Output {
  success: OutputStatus;
  error?: string;
  result: OutputResult;
}
