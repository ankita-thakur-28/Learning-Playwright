const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser}) =>
    {
       // chrome - plugins/cookies

         
         
     const context = await browser.newContext();
     const page = await context.newPage();
     const userName = page.locator('#username');
     const signIn = page.locator("#signInBtn");
     const cardTitle = page.locator(".card-body a");
      page.on('request',request=> console.log(request.url()));
      page.on('response',response=> console.log(response.url(), response.status()));
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());     

    // css, xpath

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    
    //type - fill

    await userName.fill("");
    await userName.fill("rahulshettyacademy"); 
    await signIn.click();
    console.log(await cardTitle.first().textContent());  
    console.log(await cardTitle.nth(1).textContent());  
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);

}); 
test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});
test('Child windows hadl', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'),
    documentLink.click(),

    ])//new page

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain); 
    await page.pause();
    console.log(await page.locator("#username").inputValue());
})
    
   
