const { assert } = require('chai');

it("Проверка валидности id товара", async({browser}) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto("http://localhost:3000/hw/store/catalog/1");
    await page.waitForSelector(".Product", {
        timeout: 1000
    });

    const addBtn = await page.$(".ProductDetails-AddToCart");
    assert.ok(addBtn, "на странице пусто, потому что id товара = 0");
})