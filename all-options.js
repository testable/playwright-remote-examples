const { chromium } = require('playwright');
const { URLSearchParams } = require('url');

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    try {
        const params = new URLSearchParams({
            // API key (Org Management => API Keys)
            key: process.env.TESTABLE_KEY,
            // browser name: chrome, edge, firefox 
            browserName: 'chrome',
            // browser version (e.g. latest, latest-1, 90)
            browserVersion: 'latest',
            // Size of the display (WxH). Defaults from the device details if not specified.
            screenResolution: '400 x 1000',
            // The region in which to run your test (use our remote configurator to see the full list of options)
            region: 'aws-us-east-1',
            // test case name is a high level grouping for related tests (e.g. project name)
            testCaseName: 'Project Top Secret',
            // a label for what this script is testing
            scenarioName: 'Basic regression test',
            // a label for the particular browser/device/screen size combo
            name: 'Chrome on a Custom Mobile Device',
            // whether or not to record a video of the session
            recordVideo: true,
            // whether or not to capture network request performance metrics, enabled by default
            capturePerformance: true,
            // whether or not to capture request/response bodies for network requests, disabled by default
            // and only relevant if capturePerformance is true
            captureBody: false,
            // whether or not to capture any messages the page writes to the browser console, enabled by default
            captureConsoleLog: true,
            // whether or not to log all commands sent at the Playwright protocol level, disabled by default
            logCommands: true,
            // whether or not to log all events generated by Playwright at the protocol level, disabled by default
            logEvents: false,
            // choose from list of preconfigured devices Testable provides (see Remote Test Configurator screen for full list)
            // ignored if device option is set like below but provided here for completeness
            deviceName: 'iPhone 12 Pro Max (428 x 926)',
            // custom device to emulate
            device: JSON.stringify({
                "name":"My Custom Mobile Device",
                "displaySize":"400x1000x24",
                "userAgent":"Custom Agent",
                "type":"device",
                "width":400,
                "height":1000,
                "scaleFactor":3,
                "isMobile":true,
                "isTouch":true,
                "isLandscape":false
            }),
            // a special tag for grouping together related test runs, 
            // typically running the same script against different browser versions and devices
            reportId: 'Report 123',
            // tags to associate with this test run; tags can be used to search for tests later
            tags: 'Server-1.2.0,Env-QA',
            // How long to keep the session alive after disconnecting (e.g. 2m, 300s, 1h).
            // If unspecified the session ends immediately after disconnecting. Make sure to not close 
            // the browser if you plan to reconnect.
            keepAlive: '1m',
            // Should match the version of Playwright you are using. If not specified, defaults to
            // the version which supports the chosen browser version.
            playwrightVersion: '1.47.2'
        });
        let browser = await chromium.connect(
            `wss://playwright.testable.io?${params}`,
            { timeout: 0 });
        let page = await browser.newPage();
        await page.setViewportSize({ width: 400, height: 1000 });

        await page.goto('https://www.google.com');
        await page.waitForTimeout(1000);

        await page.screenshot({ path: 'test.png' });

        // get the sessionId so we can reconnect to the same session
        const sessionId = (await page.evaluate(function testable_info() {})).sessionId;
        console.log(`Session ID: ${sessionId}`);

        // disconnect and sleep 1 second
        browser.close();
        await sleep(1000);

        // reconnect to the same session
        params.set('sessionId', sessionId);
        browser = await chromium.connect(
            `wss://playwright.testable.io?${params}`,
            { timeout: 0 });

        page = await browser.newPage();
        await page.goto('https://amazon.com');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'amazon.png' });

        browser.close();
    } catch (err) {
        console.log(err);
    }
})();
