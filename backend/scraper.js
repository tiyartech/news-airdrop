const axios = require('axios');
const cheerio = require('cheerio');
const sources = require('./airdrop-sources');

async function getAirdrops() {
  const allAirdrops = [];

  for (const source of sources) {
    try {
      const { data } = await axios.get(source.url);
      const $ = cheerio.load(data);

      let drops = [];

      // 💡 Setiap website beda struktur, jadi contoh scrapping dibedain:
      if (source.name === "Airdrops.io") {
        $('.airdrops .title a').each((i, el) => {
          const name = $(el).text().trim();
          const link = $(el).attr('href');
          if (name && link) {
            drops.push({ name, link, source: source.name, potential: "Tinggi" });
          }
        });
      }

      if (source.name === "CoinMarketCap Airdrops") {
        $('.cmc-table-row .cmc-link').each((i, el) => {
          const name = $(el).text().trim();
          const link = "https://coinmarketcap.com" + $(el).attr('href');
          if (name && link) {
            drops.push({ name, link, source: source.name, potential: "Tinggi" });
          }
        });
      }

      // ✅ Kalau belum ada struktur scraping yang cocok, skip aja:
      if (drops.length === 0) {
        console.log(`[!] Skipped ${source.name}, belum support scraping`);
        continue;
      }

      // 🚀 Tambahkan hasil scrape ke list global
      allAirdrops.push(...drops.slice(0, 5)); // ambil 5 per sumber
    } catch (err) {
      console.error(`Gagal ambil dari ${source.name}: ${err.message}`);
    }
  }

  return allAirdrops;
}

module.exports = { getAirdrops };
