import { OutputType } from './output-parameters';

export enum SourceTypes {
  MOD = 'mod',
  ORYX = 'oryx',
}
export type Source = SourceTypes.MOD | SourceTypes.ORYX;

export interface StartParameters {
  source: Source;
  output: OutputType;
  outputPath: string;
  full?: boolean;
  headless?: boolean;
}
