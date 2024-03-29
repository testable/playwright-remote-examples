const { chromium } = require('playwright');
const { URLSearchParams } = require('url');

(async () => {
    let browser;
    try {
        const params = new URLSearchParams({
            // API key (Org Management => API Keys)
            key: process.env.TESTABLE_KEY,
            // Browser name: chrome, edge, firefox 
            browserName: 'chrome',
            // Browser version (e.g. latest, latest-1, 90)
            browserVersion: 'latest',
            // Size of the display (WxH)
            screenResolution: '1920x1080',
            // The region in which to run your test (use our remote configurator to see the full list of options)
            region: 'aws-us-east-1'
        }).toString();
        browser = await chromium.connect(
            `wss://playwright.testable.io?${params}`,
            { timeout: 0 });
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        await page.goto('https://google.com');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test.png' });

        await browser.close();
    } catch (err) {
        console.log(err);
        if (browser)
            browser.close();
    }
})();
