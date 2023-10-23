import { startBrowser } from 'src/browser';

describe('startBrowser', () => {
  it('should open a browser instance in headless mode', async () => {
    const browser = await startBrowser(true);
    expect(browser).not.toBeNull();
    await browser?.close();
  });

  it('should open a browser instance in non-headless mode', async () => {
    const browser = await startBrowser(false);
    expect(browser).not.toBeNull();
    await browser?.close();
  });

  it('should handle errors and return null', async () => {
    jest.spyOn(require('puppeteer'), 'launch').mockRejectedValue(new Error('Test error'));
    const browser = await startBrowser(true);
    expect(browser).toBeNull();
    jest.restoreAllMocks();
  });
});
