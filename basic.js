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
            screenResolution: '1920x1080'
        }).toString();
        const browser = await chromium.connect(
            `ws://ec2-3-16-162-61.us-east-2.compute.amazonaws.com:8080/playwright?${params}`,
            { timeout: 0 });
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        await page.goto('https://google.com');
        await page.waitForTimeout(5000);

        await page.screenshot({ path: 'test.png' });
        await browser.close();
    } catch (err) {
        console.log(err);
    }
})();
