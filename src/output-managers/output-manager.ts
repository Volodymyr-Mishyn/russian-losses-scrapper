import { Formatter } from 'src/formatters/formatter';
import { ScrapResult } from 'src/models/scrap-results/scrap-result';

export abstract class OutputManager<FR> {
  constructor(
    protected scrappedMetaData: Omit<ScrapResult<unknown>, 'result'>,
    protected formatter: Formatter<unknown, FR>,
  ) {}

  protected abstract processOutput(): void;

  public output(): void {
    this.processOutput();
  }
}
