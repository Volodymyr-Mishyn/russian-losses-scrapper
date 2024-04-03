import { Logger } from '../_helpers/logger';
import { Formatter } from '../formatters/formatter';
import { FormatterFactory } from '../formatters/formatter.factory';
import { Output } from '../models/outputs/output';
import { ScrapResult } from '../models/scrap-results/scrap-result';

export abstract class OutputManager {
  protected formatter!: Formatter<unknown, unknown>;
  constructor(protected scrappedData: ScrapResult<unknown>, protected outputPath: string = '') {
    this.formatter = FormatterFactory.create(scrappedData);
  }

  protected abstract formatData(): Promise<unknown>;
  protected abstract innerSend(output: Output): Promise<void | Output>;

  protected async sendOutput(output: Output): Promise<void | Output> {
    try {
      return await this.innerSend(output);
    } catch (error) {
      const errorMessage = (error as any).message;
      console.log('Error while performing output:', errorMessage);
    }
  }

  protected async processOutput(): Promise<void | Output> {
    let output: Output;
    if (!this.scrappedData.status) {
      output = {
        success: false,
        error: this.scrappedData.error,
        result: { date: this.scrappedData.date, type: this.scrappedData.type },
      };
    } else {
      try {
        const formattedData = await this.formatData();
        output = {
          success: true,
          result: { date: this.scrappedData.date, type: this.scrappedData.type, data: formattedData },
        };
      } catch (error) {
        output = {
          success: false,
          error: (error as any).message,
          result: { date: this.scrappedData.date, type: this.scrappedData.type },
        };
      }
    }
    return await this.sendOutput(output);
  }

  public async output(): Promise<void | Output> {
    Logger.getInstance().info('outputting data');
    const result = await this.processOutput();
    Logger.getInstance().info('output complete');
    return result;
  }
}
