const minimist = require('minimist');
import { Browser, Page } from 'puppeteer';
import { processCLIParameters } from './_helpers/process-cli-parameters';
import { startBrowser } from './browser';
import { StartParameters } from './models/scrap-parameters';
import { PageScrapperFactory } from './scrappers/page-scrapper.factory';
import { ScrapResult } from './models/scrap-results/scrap-result';
import { OutputManagerFactory } from './output-managers/output-manager.factory';
import { Logger } from './_helpers/logger';

const cliArgs = minimist(process.argv.slice(2));
Logger.getInstance().info(`scape app started with parameters: ${cliArgs.source} ${cliArgs.oryxType || ''}`);

async function scrapeData(parameters: StartParameters, page: Page) {
  const scrapper = PageScrapperFactory.create(parameters, page);
  return scrapper.scrapPage();
}

async function outputData(parameters: StartParameters, scrappedData: ScrapResult<unknown>): Promise<unknown | void> {
  const outputManager = OutputManagerFactory.create(parameters, scrappedData);
  return outputManager.output();
}

async function main(browser: Browser, startParameters: StartParameters) {
  Logger.getInstance().info('attempting to open new page');
  const page = await browser.newPage();
  Logger.getInstance().info('page opened');
  const scrappedData = await scrapeData(startParameters, page);
  await browser.close();
  return outputData(startParameters, scrappedData);
}

async function runScraper(parameters: StartParameters): Promise<unknown | void> {
  const browser = await startBrowser(parameters.headless);
  if (!browser) {
    return;
  }
  try {
    return await main(browser, parameters);
  } catch (error) {
    console.error(error);
  }
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
