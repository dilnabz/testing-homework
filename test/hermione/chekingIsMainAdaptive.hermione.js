async function checkingAdaptive(browser, width, height) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.setViewport({
        width,
        height
    });

    await page.goto("http://localhost:3000/hw/store");
    await browser.assertView("plain", ".Application", {
        screenshotDelay: 2000,
    });
};

describe("Интеграционный тест для проверки адаптивности верстки главной страницы", () => {
    it("Верстка главной страницы должна быть корректной при ширине экрана 1920px", async({browser}) => {
        await checkingAdaptive(browser, 1920, 1080);
    }),
    it("Верстка главной страницы должна быть корректной при ширине экрана 1280px", async({browser}) => {
        await checkingAdaptive(browser, 1280, 720);
    }),
    it("Верстка главной страницы должна быть корректной при ширине экрана 1024px", async({browser}) => {
        await checkingAdaptive(browser, 1024, 768);
    }),
    it("Верстка главной страницы должна быть корректной при ширине экрана 820px", async({browser}) => {
        await checkingAdaptive(browser, 820, 1180);
    }),
    it("Верстка главной страницы должна быть корректной при ширине экрана 768px", async({browser}) => {
        await checkingAdaptive(browser, 768, 1024);
    }),
    it("Верстка главной страницы должна быть корректной при ширине экрана 360px", async({browser}) => {
        await checkingAdaptive(browser, 360, 740);
    })
});
