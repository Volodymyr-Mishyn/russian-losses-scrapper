import { SourceType, StartParameters } from '../models/scrap-parameters';

function isValidSourceType(str: string): str is SourceType {
  return Object.values(SourceType).includes(str as SourceType);
}
export function processCLIParameters(parameters: Record<string, string | boolean>): StartParameters {
  const { source, full = false, notHeadless = false } = parameters;
  if (typeof source !== 'string' || !isValidSourceType(source)) {
    throw new Error('not valid source type');
  }
  return { source, full: Boolean(full), headless: !Boolean(notHeadless) };
}
