import { OutputTypes } from '../models/output-parameters';
import { SourceTypes, StartParameters } from '../models/scrap-parameters';

function isValidSourceType(str: string): str is SourceTypes {
  return Object.values(SourceTypes).includes(str as SourceTypes);
}

function isValidOutputType(str: string): str is OutputTypes {
  return Object.values(OutputTypes).includes(str as OutputTypes);
}
export function processCLIParameters(parameters: Record<string, string | boolean>): StartParameters {
  const { source, output = OutputTypes.NONE, outputPath = '', full = false, notHeadless = false } = parameters;
  if (typeof source !== 'string' || !isValidSourceType(source)) {
    throw new Error('not valid source type');
  }
  if (typeof output !== 'string' || !isValidOutputType(output)) {
    throw new Error('not valid output type');
  }
  return { source, output, outputPath: `${outputPath}`, full: Boolean(full), headless: !Boolean(notHeadless) };
}
