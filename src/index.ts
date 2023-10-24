const minimist = require('minimist');
import { Browser, Page } from 'puppeteer';
import { processCLIParameters } from './_helpers/process-cli-parameters';
import { startBrowser } from './browser';
import { FormatterFactory } from './formatters/formatter.factory';
import { StartParameters } from './models/scrap-parameters';
import { PageScrapperFactory } from './scrappers/page-scrapper.factory';
import { ScrapResult } from './models/scrap-results/scrap-result';
import { OutputTypes } from './models/output-parameters';
import { OutputManagerFactory } from './output-managers/output-manager.factory';

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

async function outputData(parameters: StartParameters, scrappedData: ScrapResult<unknown>) {
  if (parameters.output === OutputTypes.NONE) {
    const result = await formatData(scrappedData);
    if (result) {
      console.log(result);
    }
  } else {
    const outputManager = OutputManagerFactory.create(parameters, scrappedData);
    return await outputManager.output();
  }
}

async function main(browser: Browser) {
  const page = await browser.newPage();
  const scrappedData = await scrapeData(startParameters, page);
  await outputData(startParameters, scrappedData);
}

(async () => {
  const browser = await startBrowser(startParameters.headless);
  if (!browser) {
    return;
  }
  try {
    await main(browser);
  } catch (error) {
    console.error(error);
  }
  await browser.close();
})();
