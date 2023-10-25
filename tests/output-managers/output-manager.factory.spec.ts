import { OutputTypes } from 'src/models/output-parameters';
import { SourceTypes, StartParameters } from 'src/models/scrap-parameters';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';
import { FileOutputManager } from 'src/output-managers/file-output-manager';
import { HTTPOutputManager } from 'src/output-managers/http-output-manager';
import { OutputManagerFactory } from 'src/output-managers/output-manager.factory';
import { ProcessOutputManager } from 'src/output-managers/process-output.manager';

describe('OutputManagerFactory', () => {
  describe('create', () => {
    const scrappedData: ScrapResult<unknown> = {
      date: '',
      status: true,
      type: SourceTypes.MOD,
    };

    it('should create a FileOutputManager when output type is "FILE"', () => {
      const parameters: StartParameters = {
        output: {
          type: OutputTypes.FILE,
          outputPath: 'output/file.txt',
        },
      } as unknown as StartParameters;
      const outputManager = OutputManagerFactory.create(parameters, scrappedData);
      expect(outputManager).toBeInstanceOf(FileOutputManager);
    });

    it('should create an HTTPOutputManager when output type is "HTTP"', () => {
      const parameters: StartParameters = {
        output: {
          type: OutputTypes.HTTP,
          outputPath: 'http://example.com',
        },
      } as unknown as StartParameters;
      const outputManager = OutputManagerFactory.create(parameters, scrappedData);
      expect(outputManager).toBeInstanceOf(HTTPOutputManager);
    });

    it('should create a ProcessOutputManager when output type is "PROCESS"', () => {
      const parameters: StartParameters = {
        output: {
          type: OutputTypes.PROCESS,
          outputPath: 'node process-script.js',
        },
      } as unknown as StartParameters;
      const outputManager = OutputManagerFactory.create(parameters, scrappedData);
      expect(outputManager).toBeInstanceOf(ProcessOutputManager);
    });

    it('should throw an error when an unsupported output type is provided', () => {
      const parameters: StartParameters = {
        output: {
          type: 'UNSUPPORTED_TYPE',
          outputPath: 'invalid',
        },
      } as unknown as StartParameters;
      expect(() => OutputManagerFactory.create(parameters, scrappedData)).toThrowError(
        'No output manager for provided type: UNSUPPORTED_TYPE',
      );
    });
  });
});
