import { processCLIParameters } from 'src/_helpers/process-cli-parameters';
import { SourceType, StartParameters } from 'src/models/scrap-parameters';

describe('processCLIParameters', () => {
  it('should return valid StartParameters for valid input', () => {
    const cliParameters = {
      source: 'mod',
      full: true,
      notHeadless: false,
    };
    const result = processCLIParameters(cliParameters);
    const expected: StartParameters = {
      source: SourceType.MOD,
      full: true,
      headless: true,
    };
    expect(result).toEqual(expected);
  });

  it('should return valid StartParameters with default values for partial input', () => {
    const cliParameters = {
      source: 'oryx',
    };
    const result = processCLIParameters(cliParameters);
    const expected: StartParameters = {
      source: SourceType.ORYX,
      full: false,
      headless: true,
    };
    expect(result).toEqual(expected);
  });

  it('should throw an error for an invalid source type', () => {
    const cliParameters = {
      source: 'invalid-source',
    };
    expect(() => processCLIParameters(cliParameters)).toThrowError('not valid source type');
  });

  it('should handle boolean values as expected', () => {
    const cliParameters = {
      source: 'oryx',
      full: 'true',
      notHeadless: 1,
    };
    const result = processCLIParameters(cliParameters as unknown as Record<string, string | boolean>);
    const expected: StartParameters = {
      source: SourceType.ORYX,
      full: true,
      headless: false,
    };
    expect(result).toEqual(expected);
  });
});
