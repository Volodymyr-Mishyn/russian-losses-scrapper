import { Formatter } from 'src/formatters/formatter';
import { FormatterFactory } from 'src/formatters/formatter.factory';
import { SourceTypes } from 'src/models/scrap-parameters';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';
import { ProcessOutputManager } from 'src/output-managers/process-output.manager';

describe('ProcessOutputManager', () => {
  const testObject = { test: 1 };
  const mockFormatter = {
    formatAsIs: () => Promise.resolve({ test: 1 }),
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
    let mockProcessOut: any;
    beforeEach(() => {
      processOutputManager = new ProcessOutputManager(mockedScrappedData, outputPath);
      mockProcessSend = jest.spyOn(process, 'send').mockImplementation(() => true);
      mockProcessOut = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
      jest.spyOn(process.stdout, 'end').mockImplementation();
    });
    describe('when data scrapped successfully', () => {
      const expectedOutput = {
        success: true,
        result: {
          date: mockedScrappedData.date,
          type: mockedScrappedData.type,
          data: testObject,
        },
      };
      it('should format data and send output via process.send', async () => {
        jest.spyOn(mockFormatter, 'formatAsIs');
        await processOutputManager.output();
        expect(mockFormatter.formatAsIs).toHaveBeenCalled();
        expect(mockProcessSend).toHaveBeenCalledWith({ [outputPath]: expectedOutput });
      });
      describe('when there is no parent process', () => {
        const send = global.process.send;
        beforeEach(() => {
          delete global.process.send;
        });
        afterEach(() => {
          global.process.send = send;
        });
        it('should format data and send output via process.stdout.write', async () => {
          await processOutputManager.output();
          expect(mockFormatter.formatAsIs).toHaveBeenCalled();
          expect(mockProcessOut).toHaveBeenCalledWith(JSON.stringify({ [outputPath]: expectedOutput }), 'utf8');
        });
      });
    });

    describe('when there is no parent process and no output stream', () => {
      it('should log error', async () => {
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
        delete global.process.send;
        (global.process.stdout as any).write = null;
        await processOutputManager.output();
        expect(console.log).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('process message'));
        consoleLogMock.mockRestore();
      });
    });
  });
});
