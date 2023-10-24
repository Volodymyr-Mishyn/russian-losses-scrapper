import { Formatter } from 'src/formatters/formatter';
import { FormatterFactory } from 'src/formatters/formatter.factory';
import { SourceTypes } from 'src/models/scrap-parameters';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';
import { FileOutputManager } from 'src/output-managers/file-output-manager';
import { OutputManager } from 'src/output-managers/output-manager';

jest.mock('fs');

describe('FileOutputManager', () => {
  const mockFormatter = {
    formatPretty: () => Promise.resolve('{}'),
  } as unknown as Formatter<unknown, unknown>;

  beforeEach(() => {
    jest.clearAllMocks();
    FormatterFactory.create = jest.fn(() => mockFormatter);
  });

  describe('output', () => {
    describe('when data scrapped successfully', () => {
      const mockedScrappedData: ScrapResult<unknown> = {
        status: true,
        date: '',
        type: SourceTypes.MOD,
      };

      const expectedOutput = JSON.stringify(
        {
          success: true,
          result: { date: mockedScrappedData.date, type: mockedScrappedData.type, data: '{}' },
        },
        null,
        2,
      );
      const outputPath = 'output/mock-file.txt';
      let fileOutputManager: OutputManager;
      let mockWriteFile: any;
      beforeEach(() => {
        fileOutputManager = new FileOutputManager(mockedScrappedData, outputPath);
        mockWriteFile = jest.spyOn(require('fs'), 'writeFile');
      });
      it('should call format and save output into a file', async () => {
        mockWriteFile.mockImplementation((path: any, data: any, callback: any) => {
          callback(null);
        });
        jest.spyOn(mockFormatter, 'formatPretty');
        await fileOutputManager.output();
        expect(mockFormatter.formatPretty).toHaveBeenCalled();
        expect(mockWriteFile).toHaveBeenCalledWith(outputPath, expectedOutput, expect.any(Function));
      });

      it('should handle errors when saving output into a file', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
        mockWriteFile.mockImplementation((path: any, data: any, callback: any) => {
          callback(new Error('File save error'));
        });
        await fileOutputManager.output();
        expect(console.error).toHaveBeenCalled();
        consoleErrorMock.mockRestore();
      });
    });
    describe('when error during formatting', () => {
      const mockedScrappedData: ScrapResult<unknown> = {
        status: true,
        date: '',
        type: SourceTypes.MOD,
      };

      const expectedOutput = JSON.stringify(
        {
          success: false,
          error: 'formatting Error',
          result: { date: mockedScrappedData.date, type: mockedScrappedData.type },
        },
        null,
        2,
      );
      const outputPath = 'output/mock-file.txt';
      let fileOutputManager: OutputManager;
      let mockWriteFile: any;
      beforeEach(() => {
        fileOutputManager = new FileOutputManager(mockedScrappedData, outputPath);
        mockWriteFile = jest.spyOn(require('fs'), 'writeFile');
      });
      it('should save info about failed formatting', async () => {
        mockWriteFile.mockImplementation((path: any, data: any, callback: any) => {
          callback(null);
        });
        jest.spyOn(mockFormatter, 'formatPretty').mockImplementation(() => {
          throw new Error('formatting Error');
        });
        await fileOutputManager.output();
        expect(mockFormatter.formatPretty).toHaveBeenCalled();
        expect(mockWriteFile).toHaveBeenCalledWith(outputPath, expectedOutput, expect.any(Function));
      });
    });
    describe('when data scrapped unsuccessfully', () => {
      const mockedScrappedData: ScrapResult<unknown> = {
        status: false,
        date: '',
        type: SourceTypes.MOD,
      };

      const expectedOutput = JSON.stringify(
        {
          success: false,
          result: { date: mockedScrappedData.date, type: mockedScrappedData.type },
        },
        null,
        2,
      );
      const outputPath = 'output/mock-file.txt';
      let fileOutputManager: OutputManager;
      let mockWriteFile: any;
      beforeEach(() => {
        fileOutputManager = new FileOutputManager(mockedScrappedData, outputPath);
        mockWriteFile = jest.spyOn(require('fs'), 'writeFile');
      });

      it('should save output into a file without formatting', async () => {
        mockWriteFile.mockImplementation((path: any, data: any, callback: any) => {
          callback(null);
        });
        jest.spyOn(mockFormatter, 'formatPretty');
        await fileOutputManager.output();
        expect(mockFormatter.formatPretty).not.toHaveBeenCalled();
        expect(mockWriteFile).toHaveBeenCalledWith(outputPath, expectedOutput, expect.any(Function));
      });
    });
  });
});
