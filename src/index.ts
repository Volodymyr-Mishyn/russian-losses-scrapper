const minimist = require("minimist");
import { Page } from "puppeteer";
import { processCLIParameters } from "./_helpers/process-cli-parameters";
import { startBrowser } from "./browser";
import { FormatterFactory } from "./formatters/formatter.factory";
import { StartParameters } from "./models/scrap-parameters";
import { PageScrapperFactory } from "./scrappers/page-scrapper.factory";
import { ScrapResult } from "./models/scrap-results/scrap-result";

const cliArgs = minimist(process.argv.slice(2));
const startParameters: StartParameters = processCLIParameters(cliArgs);
console.log(startParameters);

async function scrapeData(parameters: StartParameters, page: Page) {
  const scrapper = PageScrapperFactory.create(parameters, page);
  return await scrapper.scrapPage();
}

async function formatData(scrappedData: ScrapResult<unknown>) {
  const formatter = FormatterFactory.create(scrappedData);
  return await formatter.format();
}

async function main() {
  const browser = await startBrowser(startParameters.headless);
  if (!browser) {
    return;
  }
  const page = await browser.newPage();
  const scrappedData = await scrapeData(startParameters, page);
  if (scrappedData) {
    const result = await formatData(scrappedData);
    if (result) {
      console.log(result);
    }
  }
  await browser.close();
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
})();
