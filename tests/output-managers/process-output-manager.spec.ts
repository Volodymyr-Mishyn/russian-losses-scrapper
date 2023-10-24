import { Formatter } from 'src/formatters/formatter';
import { FormatterFactory } from 'src/formatters/formatter.factory';
import { SourceTypes } from 'src/models/scrap-parameters';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';
import { ProcessOutputManager } from 'src/output-managers/process-output.manager';

describe('ProcessOutputManager', () => {
  const mockFormatter = {
    format: () => Promise.resolve('formatted data'),
  } as unknown as Formatter<unknown, unknown>;

  beforeEach(() => {
    jest.clearAllMocks();
    FormatterFactory.create = jest.fn(() => mockFormatter);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the FormatterFactory to return the mockFormatter
    FormatterFactory.create = jest.fn(() => mockFormatter);
  });

  describe('output', () => {
    const mockedScrappedData: ScrapResult<unknown> = {
      status: true,
      date: '',
      type: SourceTypes.MOD,
    };
    const outputPath = 'output/mock-process-output';
    let processOutputManager: ProcessOutputManager;
    let mockProcessSend: any;
    beforeEach(() => {
      processOutputManager = new ProcessOutputManager(mockedScrappedData, outputPath);
      mockProcessSend = jest.spyOn(process, 'send');
    });
    describe('when data scrapped successfully', () => {
      const expectedOutput = {
        success: true,
        result: {
          date: mockedScrappedData.date,
          type: mockedScrappedData.type,
          data: 'formatted data',
        },
      };
      it('should format data and send output via process.send', async () => {
        jest.spyOn(mockFormatter, 'format');
        await processOutputManager.output();
        expect(mockFormatter.format).toHaveBeenCalled();
        expect(mockProcessSend).toHaveBeenCalledWith({ [outputPath]: expectedOutput });
      });
    });

    describe('when there is no parent process', () => {
      it('should log error', async () => {
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
        delete global.process.send;
        await processOutputManager.output();
        expect(console.log).toHaveBeenCalledWith(expect.any(String), 'no parent process');
        consoleLogMock.mockRestore();
      });
    });
  });
});
