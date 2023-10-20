import { Page } from "puppeteer";

export abstract class PageScrapper {
  protected abstract baseUrl: string;
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  protected abstract  innerScrap(): Promise<void>;
  public async scrapPage(): Promise<void> {
    await this.page.goto(this.baseUrl);
    return this.innerScrap();
  }
}
