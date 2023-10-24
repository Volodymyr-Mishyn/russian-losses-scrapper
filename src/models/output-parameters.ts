export enum OutputTypes {
  FILE = 'file',
  HTTP = 'http',
  PROCESS = 'process',
  NONE = 'none',
}

export type OutputType = OutputTypes.FILE | OutputTypes.HTTP | OutputTypes.PROCESS | OutputTypes.NONE;
