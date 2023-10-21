export interface MODEntityLoss {
  name: string;
  total: number;
  increment: number;
}

export interface MODDayFormatResult {
  date: string;
  casualties: Array<MODEntityLoss>;
}

export type MODFormatResult = Array<MODDayFormatResult>;
