import { clone } from 'lodash';

export abstract class Formatter<D, R> {
  protected data: D;
  constructor(dataToFormat: D) {
    this.data = clone(dataToFormat);
  }
  protected abstract innerFormat(): Promise<R>;

  public async format(): Promise<string> {
    const formatted = await this.innerFormat();
    return JSON.stringify(formatted);
  }

  public async formatPretty(): Promise<string> {
    const formatted = await this.innerFormat();
    return JSON.stringify(formatted, null, 2);
  }

  public async formatAsIs(): Promise<R> {
    return this.innerFormat();
  }
}
