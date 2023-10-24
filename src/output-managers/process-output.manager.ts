import { OutputManager } from './output-manager';

export class ProcessOutputManager<FR> extends OutputManager<FR> {
  protected async processOutput(): Promise<void> {
    const formattedData = await this.formatter.format();
    process.send();
  }
}
