const puppeteer = require("puppeteer");

async function googleSearch(query, numResults) {
  try {
    //https://serpapi.com/search-api
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com.hk/search?q=${encodeURIComponent(
        query
      )}&oq=${encodeURIComponent(
        query
      )}&uule=w+CAIQICIaQXVzdGluLFRleGFzLFVuaXRlZCBTdGF0ZXM&hl=en&gl=us&sourceid=chrome&ie=UTF-8%22#ip=1`,
      { waitUntil: "networkidle2" }
    );
    const summaries = await page.evaluate((num) => {
      const liElements = Array.from(
        document.querySelector("#search > div > div").childNodes
      );
      const firstFiveLiElements = liElements.slice(0, num);
      return firstFiveLiElements.map((li) => {
        const linkElement = li.querySelector("a");
        if (!linkElement) return;
        const href = linkElement.getAttribute("href");
        const title = linkElement.querySelector("a > h3")?.textContent;
        const abstract = Array.from(
          li.querySelectorAll("div > div > div > div > div > div > span")
        )
          .map((e) => e.textContent)
          .join("");
        return { href, title, abstract };
      });
    },numResults);
    await browser.close();
    const summariesFiltered = summaries.filter((s) => s && s.title && s.href && s.abstract);
    return summariesFiltered;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function bingSearch(query, numResults) {
  try {
    //https://serpapi.com/bing-search-api
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.bing.com/search?form=QBRE&q=${encodeURIComponent(
        query
      )}&cc=US`,
      { waitUntil: 'networkidle2' }
    );
    const summaries = await page.evaluate((num) => {
      const liElements = Array.from(
        document.querySelectorAll("#b_results > .b_algo")
      );
      const firstFiveLiElements = liElements.slice(0, num);
      return firstFiveLiElements.map((li) => {
        const abstractElement = li.querySelector(".b_caption > p");
        const linkElement = li.querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = li.querySelector("h2").textContent;

        const abstract = abstractElement ? abstractElement.textContent : "";
        return { href, title, abstract };
      });
    },numResults);
    await browser.close();
    const summariesFiltered = summaries.filter((s) => s && s.title && s.href && s.abstract);
    return summariesFiltered;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function yahooSearch(query, numResults) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://search.yahoo.com/search?p=${encodeURIComponent(
        query
      )}&ei=UTF-8&fr=fp-tts`
    );
    const summaries = await page.evaluate((num) => {
      const liElements = Array.from(
        document.querySelector(".searchCenterMiddle").childNodes
      );
      const firstFiveLiElements = liElements.slice(0, num);
      return firstFiveLiElements.map((li) => {
        const compTextElement = li.querySelector(".compText");
        const linkElement = li.querySelector("a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.getAttribute("aria-label");

        const abstract = compTextElement ? compTextElement.textContent : "";
        return { href, title, abstract };
      });
    },numResults);
    await browser.close();
    const summariesFiltered = summaries.filter((s) => s && s.title && s.href && s.abstract);
    return summariesFiltered;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function duckduckgoSearch(query, numResults) {
  try {
    //https://serpapi.com/duckduckgo-search-api
    // 可以改区域，这些设置的是港区
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://duckduckgo.com/?q=${encodeURIComponent(query)}&kl=hk-tzh&ia=web`,
      { waitUntil: 'networkidle2' }
    );
    const summaries = await page.evaluate((num) => {
      const liElements = Array.from(
        document.querySelectorAll("#react-layout ol > li"),
      );
      const firstFiveLiElements = liElements.slice(0, num);
      return firstFiveLiElements.map((li) => {
        const abstractElement = li
          .querySelector("article > div:nth-child(4)");
        const linkElement = li
          .querySelector("article > div > h2 > a");
        const href = linkElement.getAttribute("href");
        const title = linkElement.textContent;
        const abstract = abstractElement ? abstractElement.textContent : "";
        return { href, title, abstract };
      });
    },numResults);
    await browser.close();
    const summariesFiltered = summaries.filter((s) => s && s.title && s.href && s.abstract);
    return summariesFiltered;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = {
  googleSearch,
  bingSearch,
  yahooSearch,
  duckduckgoSearch,
};
