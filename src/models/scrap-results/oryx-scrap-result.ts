export interface OryxEntityTypeScrapResult {
  summary: string;
  list: Array<string>;
}
export interface OryxScrapResult {
  title: string;
  entities: Array<OryxEntityTypeScrapResult>;
}
