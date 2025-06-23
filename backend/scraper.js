// Nanti ini bisa diganti ke fetch web asli airdrops.io, coinmarketcap, dll
function getAirdrops() {
  return Promise.resolve([
    {
      name: 'Boinkers Airdrop',
      benefit: '$100 BOINK + NFT',
      potential: '🔥 Tinggi',
      link: 'https://t.me/boinkersairdropbot'
    },
    {
      name: 'Pepe X Airdrop',
      benefit: '50.000 PEPEX Token',
      potential: '⚠️ Medium',
      link: 'https://pepex.io/airdrop'
    },
    {
      name: 'Grass Mises Browser',
      benefit: '$5-$10 saat listing',
      potential: '🚀 Besar',
      link: 'https://mises.io/airdrop'
    }
  ]);
}

module.exports = { getAirdrops };
