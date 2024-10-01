import { Browser, launch } from 'puppeteer';
import { Logger } from './_helpers/logger';

export async function startBrowser(headless: boolean = true): Promise<Browser | null> {
  let browser;
  try {
    Logger.getInstance().info('Opening the browser');
    browser = await launch({
      headless: headless ? 'new' : false,
      args: ['--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process', '--no-sandbox'],
      ignoreHTTPSErrors: true,
      dumpio: false,
      devtools: headless ? false : true,
    });
    //'--auto-open-devtools-for-tabs'
    Logger.getInstance().info('Opening the browser successful');
    return browser;
  } catch (err) {
    Logger.getInstance().error('Could not create a browser instance => : ' + err);
    return null;
  }
}
