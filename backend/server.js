const express = require('express');
const cors = require('cors');
const { getAirdrops } = require('./scraper');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint utama: kirim data Airdrop
app.get('/api/airdrops', async (req, res) => {
  try {
    const data = await getAirdrops();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend jalan di http://localhost:${PORT}`);
});
