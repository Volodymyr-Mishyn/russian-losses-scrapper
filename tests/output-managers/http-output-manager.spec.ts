import axios from 'axios';
import { Formatter } from 'src/formatters/formatter';
import { FormatterFactory } from 'src/formatters/formatter.factory';
import { SourceTypes } from 'src/models/scrap-parameters';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';
import { HTTPOutputManager } from 'src/output-managers/http-output-manager';
import { OutputManager } from 'src/output-managers/output-manager';

jest.mock('axios');

describe('HTTPOutputManager', () => {
  const mockFormatter = {
    formatAsIs: () => Promise.resolve({}),
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

      const expectedOutput = {
        success: true,
        result: { date: mockedScrappedData.date, type: mockedScrappedData.type, data: {} },
      };
      const outputPath = 'some-url.com/api';
      let httpOutputManager: OutputManager;
      let mockWriteFile: any;
      beforeEach(() => {
        httpOutputManager = new HTTPOutputManager(mockedScrappedData, outputPath);
        mockWriteFile = jest.spyOn(require('fs'), 'writeFile');
      });
      it('should format data and send output via HTTP', async () => {
        const mockAxiosPost = jest.spyOn(axios, 'post');
        mockAxiosPost.mockResolvedValue({ data: 'HTTP response data' });
        jest.spyOn(mockFormatter, 'formatAsIs');
        await httpOutputManager.output();
        expect(mockFormatter.formatAsIs).toHaveBeenCalled();
        expect(mockAxiosPost).toHaveBeenCalledWith(outputPath, expectedOutput);
      });
    });
  });
});
