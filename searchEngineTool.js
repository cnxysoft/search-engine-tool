const {
  googleSearch,
  bingSearch,
  yahooSearch,
  duckduckgoSearch,
} = require("./searchEngines");

async function searchEngineTool(query, engine, numResults = 5) {
  let results = [];
  switch (engine) {
    case "google":
      results = await googleSearch(query, numResults);
      break;
    case "bing":
      results = await bingSearch(query, numResults);
      break;
    case "yahoo":
      results = await yahooSearch(query, numResults);
      break;
    case "duckduckgo":
      results = await duckduckgoSearch(query, numResults);
      break;
    default:
      throw new Error("Invalid search engine specified.");
  }
  return results;
}

module.exports = searchEngineTool;
