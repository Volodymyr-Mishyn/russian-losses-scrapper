import { processCLIParameters } from 'src/_helpers/process-cli-parameters';
import { OutputTypes } from 'src/models/output-parameters';
import { SourceTypes, StartParameters } from 'src/models/scrap-parameters';

describe('processCLIParameters', () => {
  it('should return valid StartParameters for valid input', () => {
    const cliParameters = {
      source: 'mod',
      full: true,
      notHeadless: false,
      output: 'process',
      outputPath: 'output',
    };
    const result = processCLIParameters(cliParameters);
    const expected: StartParameters = {
      source: {
        type: SourceTypes.MOD,
        full: true,
      },
      output: {
        type: OutputTypes.PROCESS,
        outputPath: 'output',
      },
      headless: true,
    };
    expect(result).toEqual(expected);
  });

  it('should return valid StartParameters with default values for partial input', () => {
    const cliParameters = {
      source: 'oryx',
      output: 'process',
      outputPath: 'output',
    };
    const result = processCLIParameters(cliParameters);
    const expected: StartParameters = {
      source: {
        type: SourceTypes.ORYX,
        full: false,
      },
      output: {
        type: OutputTypes.PROCESS,
        outputPath: 'output',
      },
      headless: true,
    };
    expect(result).toEqual(expected);
  });

  it('should throw an error for an invalid source type', () => {
    const cliParameters = {
      source: 'invalid-source',
      output: 'process',
    };
    expect(() => processCLIParameters(cliParameters)).toThrowError('not valid source type');
  });
  it('should throw an error for an invalid output type', () => {
    const cliParameters = {
      source: 'oryx',
      output: 'invalid-output',
    };
    expect(() => processCLIParameters(cliParameters)).toThrowError('not valid output type');
  });

  it('should handle boolean values and parse them from input', () => {
    const cliParameters = {
      source: 'oryx',
      full: 'true',
      notHeadless: 1,
      output: 'process',
      outputPath: 'output',
    };
    const result = processCLIParameters(cliParameters as unknown as Record<string, string | boolean>);
    const expected: StartParameters = {
      source: {
        type: SourceTypes.ORYX,
        full: true,
      },
      output: {
        type: OutputTypes.PROCESS,
        outputPath: 'output',
      },
      headless: false,
    };
    expect(result).toEqual(expected);
  });
});
