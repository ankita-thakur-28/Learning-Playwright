const { test, expect } = require('@playwright/test');

test('Navigate to W3Schools JavaScript Functions tutorial', async ({ page }) => {

    await page.goto('https://www.google.com/');


    await page.getByRole('link', { name: 'W3Schools Online Web' }).click();


    await page.getByRole('link', { name: 'JAVASCRIPT', exact: true }).click();


    await page.getByRole('link', { name: 'JS Functions ' }).first().click();


    const tryItYourselfPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Try it Yourself »' }).first().click();
    const tryItYourselfPage = await tryItYourselfPagePromise;


    await tryItYourselfPage.getByRole('button', { name: 'Run ❯' }).click();
});
