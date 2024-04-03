import { Output } from 'src/models/outputs/output';
import { OutputManager } from './output-manager';

export class PlainOutputManager extends OutputManager {
  protected async formatData(): Promise<unknown> {
    return this.formatter.formatAsIs();
  }
  protected async innerSend(output: Output): Promise<void | Output> {
    return output;
  }
}
