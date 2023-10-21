import { Formatter } from "./formatter";

export class DefaultFormatter extends Formatter<unknown, unknown> {
  protected innerFormat(): Promise<unknown> {
    return Promise.resolve(this.data);
  }
}
