export enum SourceType {
  MOD = 'mod',
  ORYX = 'oryx',
}
export type Source = SourceType.MOD | SourceType.ORYX;

export interface StartParameters {
  source: Source;
  full?: boolean;
  headless?: boolean;
}
