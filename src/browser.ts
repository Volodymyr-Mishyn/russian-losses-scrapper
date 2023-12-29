import { Browser, launch } from 'puppeteer';
import { Logger } from './_helpers/logger';

export async function startBrowser(headless: boolean = true): Promise<Browser | null> {
  let browser;
  try {
    console.log('Opening the browser');
    Logger.getInstance().info('Opening the browser');
    browser = await launch({
      headless: headless ? 'new' : false,
      args: ['--disable-setuid-sandbox', '--auto-open-devtools-for-tabs', '--no-sandbox'],
      ignoreHTTPSErrors: true,
      dumpio: false,
    });
    return browser;
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
    Logger.getInstance().error('Could not create a browser instance => : ' + err);
    return null;
  }
}
