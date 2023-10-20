import { Browser, launch } from "puppeteer";

export async function startBrowser(
  headless: boolean = true
): Promise<Browser | null> {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await launch({
      headless,
      args: ["--disable-setuid-sandbox", "--auto-open-devtools-for-tabs"],
      ignoreHTTPSErrors: true,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    return null;
  }
}
