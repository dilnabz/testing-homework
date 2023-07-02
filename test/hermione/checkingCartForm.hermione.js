const { assert } = require('chai');

it("Проверка оформления заказа", async({browser}) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto("http://localhost:3000/hw/store/catalog/0");
    await page.waitForSelector(".Product", {
        timeout: 1000
    });

    await page.click(".ProductDetails-AddToCart");

    await page.goto("http://localhost:3000/hw/store/cart");

    await page.type("#f-name", "Имя Фамилия");
    await page.type("#f-phone", "89997775533");
    await page.type("#f-address", "Главная улица");

    await page.click(".Form-Submit");

    await page.waitForSelector(".Cart-SuccessMessage.alert.alert-success", {
        timeout: 2000
    });

    await browser.assertView("plain", ".Application", {
        screenshotDelay: 2000,
    });

    const wellDone = await page.$(".alert-heading");
    assert.ok(wellDone, "нет надписи Well Done!");
})