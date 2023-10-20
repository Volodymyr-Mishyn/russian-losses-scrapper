const minimist = require("minimist");
import { processCLIParameters } from "./_helpers/process-cli-parameters";
import { startBrowser } from "./browser";
import { StartParameters } from "./models/scrap-parameters";
import { PageScrapperFactory } from "./scrappers/page-scrapper.factory";

const cliArgs = minimist(process.argv.slice(2));
const parameters: StartParameters = processCLIParameters(cliArgs);
console.log(parameters);
(async () => {
  const browser = await startBrowser(parameters.headless);
  if (browser) {
    const page = await browser.newPage();
    const scrapper = PageScrapperFactory.create(parameters, page);
    await scrapper.scrapPage();
    await browser.close();
  }
})();
