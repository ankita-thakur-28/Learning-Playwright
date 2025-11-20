const { test, expect,} = require('@playwright/test');


test('visit SMU page using Google Chrome', async ({browser}) => {


    const context = await browser.newContext();
    const page = await context.newPage();


  

  await page.goto('https://smu.edu.in');

  await expect(page).toHaveURL(/smu\.edu\.in/i);

});
