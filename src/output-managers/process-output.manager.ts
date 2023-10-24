import { Output } from '../models/outputs/output';
import { OutputManager } from './output-manager';

export class ProcessOutputManager extends OutputManager {
  protected async formatData(): Promise<unknown> {
    return this.formatter.format();
  }

  protected async innerSend(output: Output): Promise<void> {
    if (!process || !process.send) {
      throw new Error('no parent process');
    }
    process.send({ [this.outputPath]: output });
  }
}
