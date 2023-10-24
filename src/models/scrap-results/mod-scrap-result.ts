export interface MODDayScrapResult {
  date: string;
  casualties: Array<string>;
}

export type MODScrapResult = Array<MODDayScrapResult>;
