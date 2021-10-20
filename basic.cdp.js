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
            // TODO region info
            region: 'aws-us-east-1'
        }).toString();
        const browser = await chromium.connectOverCDP(
            `wss://dev.testable.io:8088/cdp?${params}`,
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
