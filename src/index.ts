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
import { Logger } from './_helpers/logger';

const cliArgs = minimist(process.argv.slice(2));
Logger.getInstance().info(`scape app started with parameters: ${cliArgs.source} ${cliArgs.oryxType || ''}`);

async function scrapeData(parameters: StartParameters, page: Page) {
  const scrapper = PageScrapperFactory.create(parameters, page);
  return await scrapper.scrapPage();
}

async function formatData(scrappedData: ScrapResult<unknown>) {
  const formatter = FormatterFactory.create(scrappedData);
  return await formatter.format();
}

async function outputData(parameters: StartParameters, scrappedData: ScrapResult<unknown>) {
  if (parameters.output.type === OutputTypes.NONE) {
    const result = await formatData(scrappedData);
    if (result) {
      console.log(result);
    }
  } else {
    const outputManager = OutputManagerFactory.create(parameters, scrappedData);
    return await outputManager.output();
  }
}

async function main(browser: Browser, startParameters: StartParameters) {
  Logger.getInstance().info('attempting to open new page');
  const page = await browser.newPage();
  Logger.getInstance().info('page opened');
  const scrappedData = await scrapeData(startParameters, page);
  await outputData(startParameters, scrappedData);
}

async function runScraper(parameters: StartParameters) {
  (async () => {
    const browser = await startBrowser(parameters.headless);
    if (!browser) {
      return;
    }
    try {
      await main(browser, parameters);
    } catch (error) {
      console.error(error);
    }
    await browser.close();
  })();
}

/**
 * Preserved to maintain working as a process mode;
 */
(async () => {
  if (!cliArgs.source) {
    return;
  }
  const startParameters: StartParameters = processCLIParameters(cliArgs);
  runScraper(startParameters);
})();

export { runScraper, StartParameters };
