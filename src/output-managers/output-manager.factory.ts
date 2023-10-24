import { OutputManager } from './output-manager';
import { OutputTypes } from '../models/output-parameters';
import { FileOutputManager } from './file-output-manager';
import { HTTPOutputManager } from './http-output-manager';
import { ProcessOutputManager } from './process-output.manager';
import { StartParameters } from '../models/scrap-parameters';
import { ScrapResult } from '../models/scrap-results/scrap-result';

export class OutputManagerFactory {
  static create(parameters: StartParameters, scrappedData: ScrapResult<unknown>): OutputManager {
    const { output, outputPath } = parameters;
    switch (output) {
      case OutputTypes.FILE:
        return new FileOutputManager(scrappedData, outputPath);
      case OutputTypes.HTTP:
        return new HTTPOutputManager(scrappedData, outputPath);
      case OutputTypes.PROCESS:
        return new ProcessOutputManager(scrappedData, outputPath);
      default:
        throw new Error(`No output manager for provided type: ${output}`);
    }
  }
}
