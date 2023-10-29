import { Output } from '../models/outputs/output';
import { OutputManager } from './output-manager';

export class ProcessOutputManager extends OutputManager {
  protected async formatData(): Promise<unknown> {
    return this.formatter.formatAsIs();
  }

  protected async innerSend(output: Output): Promise<void> {
    const resultObject = { [this.outputPath]: output };
    try {
      if (process && process.send) {
        process.send(resultObject);
        return;
      } else {
        process.stdout.write(JSON.stringify(resultObject), 'utf8');
        process.stdout.end();
      }
    } catch (error: any) {
      throw new Error('error while sending process message: ' + error.message);
    }
  }
}
