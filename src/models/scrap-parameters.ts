import { OutputType } from './output-parameters';

export enum SourceTypes {
  MOD = 'mod',
  ORYX = 'oryx',
}
export type Source = SourceTypes.MOD | SourceTypes.ORYX;

export enum OryxTypes {
  RUSSIA = 'Russia',
  UKRAINE = 'Ukraine',
}
export type OryxType = OryxTypes.RUSSIA | OryxTypes.UKRAINE;

export interface StartParameters {
  source: {
    type: Source;
    full?: boolean;
    subType?: OryxTypes;
  };
  output: {
    type: OutputType;
    outputPath?: string;
  };
  headless?: boolean;
}
