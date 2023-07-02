const { assert } = require('chai');

describe("Проверка гамбургер-меню", () => {
    it("на ширине меньше 576px навигационное меню должно скрываться за гамбургер", async({browser}) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.setViewport({
            width: 575,
            height: 400,
        })

        await page.goto("http://localhost:3000/hw/store/");
        await page.waitForSelector(".Application", {
            timeout: 5000
        });

        const menu = await page.$(".Application-Toggler");
        assert.ok(menu, "нет меню");
    }),
    it("при выборе элемента из меню гамбургера меню должно закрываться", async({browser}) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.setViewport({
            width: 575,
            height: 400,
        })

        await page.goto("http://localhost:3000/hw/store/");
        await page.waitForSelector(".Application", {
            timeout: 2000
        });

        await page.click(".Application-Toggler");
        await page.click(".nav-link");
        const collapse = await page.$(".collapse");
        assert.ok(collapse, "меню не закрывается");
    })
});