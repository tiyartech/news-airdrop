const express = require('express');
const cors = require('cors');
const { getAirdrops } = require('./scraper');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/airdrops', async (req, res) => {
  try {
    const airdrops = await getAirdrops();
    res.json(airdrops);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data airdrop.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
