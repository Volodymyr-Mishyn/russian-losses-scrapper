import { OutputTypes } from '../models/output-parameters';
import { OryxType, OryxTypes, SourceTypes, StartParameters } from '../models/scrap-parameters';

function isValidSourceType(str: string): str is SourceTypes {
  return Object.values(SourceTypes).includes(str as SourceTypes);
}
function isValidSourceSubType(str: string): str is OryxTypes {
  return Object.values(OryxTypes).includes(str as OryxTypes);
}

function isValidOutputType(str: string): str is OutputTypes {
  return Object.values(OutputTypes).includes(str as OutputTypes);
}

export function processCLIParameters(parameters: Record<string, string | boolean>): StartParameters {
  const {
    source,
    oryxType,
    output = OutputTypes.NONE,
    outputPath = '',
    full = false,
    notHeadless = false,
  } = parameters;
  if (typeof source !== 'string' || !isValidSourceType(source)) {
    throw new Error('not valid source type');
  }
  if (oryxType) {
    if (typeof oryxType !== 'string' || !isValidSourceSubType(oryxType)) {
      throw new Error('not valid source oryxType');
    }
  }
  if (typeof output !== 'string' || !isValidOutputType(output)) {
    throw new Error('not valid output type');
  }
  return {
    source: {
      type: source,
      full: Boolean(full),
      ...(oryxType && { subType: oryxType as OryxType }),
    },
    output: {
      type: output,
      outputPath: `${outputPath}`,
    },
    headless: !Boolean(notHeadless),
  };
}
