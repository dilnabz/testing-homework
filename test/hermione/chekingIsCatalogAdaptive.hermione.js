async function checkingAdaptive(browser, width, height) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({
        width,
        height
    });

    await page.goto("http://localhost:3000/hw/store/catalog");
    
    await browser.assertView("plain", ".Application", {
        screenshotDelay: 2000,
    });
};

describe("Интеграционный тест для проверки адаптивности верстки каталога", () => {
    it("Верстка каталога должна быть корректной при ширине экрана 1920px", async({browser}) => {
        await checkingAdaptive(browser, 1920, 1080);
    }),
    it("Верстка каталога должна быть корректной при ширине экрана 1280px", async({browser}) => {
        await checkingAdaptive(browser, 1280, 720);
    }),
    it("Верстка каталога должна быть корректной при ширине экрана 1024px", async({browser}) => {
        await checkingAdaptive(browser, 1024, 768);
    }),
    it("Верстка каталога должна быть корректной при ширине экрана 768px", async({browser}) => {
        await checkingAdaptive(browser, 768, 1024);
    })
});
