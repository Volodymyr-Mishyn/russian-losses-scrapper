import { Output } from 'src/models/outputs/output';
import { OutputManager } from './output-manager';
import * as fs from 'fs';

export class FileOutputManager extends OutputManager {
  private async _saveOutputIntoFile(output: Output): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.outputPath, JSON.stringify(output, null, 2), (error) => {
        if (error) {
          console.error(`Error while saving data to file: ${error}`);
          reject(error);
        } else {
          console.log(`Data saved to ${this.outputPath}`);
          resolve();
        }
      });
    });
  }
  protected async formatData(): Promise<unknown> {
    return this.formatter.formatPretty();
  }
  protected async innerSend(output: Output): Promise<void> {
    await this._saveOutputIntoFile(output);
  }
}
