export enum OutputTypes {
  FILE = 'file',
  HTTP = 'http',
  PROCESS = 'process',
}

export type OutputType = OutputTypes.FILE | OutputTypes.HTTP | OutputTypes.PROCESS;
