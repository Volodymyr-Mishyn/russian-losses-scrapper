import { Output } from 'src/models/outputs/output';
import { OutputManager } from './output-manager';
import axios from 'axios';

export class HTTPOutputManager extends OutputManager {
  protected formatData(): Promise<unknown> {
    return this.formatter.formatAsIs();
  }
  protected async innerSend(output: Output): Promise<void> {
    await axios.post(this.outputPath, output);
  }
}
