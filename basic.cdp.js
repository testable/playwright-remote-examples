const { chromium } = require('playwright');
const { URLSearchParams } = require('url');

(async () => {
    try {
        const params = new URLSearchParams({
            // API key (Org Management => API Keys)
            key: process.env.TESTABLE_KEY,
            // browser name: chrome, edge, firefox 
            browserName: 'chrome',
            // browser version (e.g. latest, latest-1, 90)
            browserVersion: 'latest',
            // size of the display (WxH)
            screenResolution: '1920x1080',
            // The region in which to run your test (use our remote configurator to see the full list of options)
            region: 'aws-us-east-1'
        }).toString();
        const browser = await chromium.connectOverCDP(
            `wss://cdp.testable.io?${params}`,
            { timeout: 0 });
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto('https://google.com/');
        await page.waitForTimeout(1000);

        await page.screenshot({ path: 'test.png' });
        await browser.close();
    } catch (err) {
        console.log(err);
    }
})();
