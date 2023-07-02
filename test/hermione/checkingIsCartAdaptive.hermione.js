async function checkingAdaptive(browser, width, height) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({
        width,
        height
    });
    await page.goto("http://localhost:3000/hw/store/catalog/0");
    await page.waitForSelector(".Product", {
        timeout: 1000
    });

    await page.click(".ProductDetails-AddToCart");

    await page.goto("http://localhost:3000/hw/store/cart");
    await browser.assertView("plain", ".Application", {
        screenshotDelay: 2000,
    });
};

describe("Интеграционный тест для проверки адаптивности верстки корзины", () => {
    it("Верстка корзины должна быть корректной при ширине экрана 1920px", async({browser}) => {
        await checkingAdaptive(browser, 1920, 1080);
    }),
    it("Верстка корзины должна быть корректной при ширине экрана 1280px", async({browser}) => {
        await checkingAdaptive(browser, 1280, 720);
    }),
    it("Верстка корзины должна быть корректной при ширине экрана 768px", async({browser}) => {
        await checkingAdaptive(browser, 768, 1024);
    }),
    it("Верстка корзины должна быть корректной при ширине экрана 360px", async({browser}) => {
        await checkingAdaptive(browser, 360, 740);
    })
});
