const { assert } = require('chai');

it("Проверка, что у товара есть название", async({browser}) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto("http://localhost:3000/hw/store/catalog");
    await page.waitForSelector(".Catalog", {
        timeout: 1000
    });

    const productName = await page.$(".ProductItem-Name");
    const productNameText = await page.evaluate(el => el.textContent, productName);
    assert.isNotEmpty(productNameText, "нет названия продукта!");
})