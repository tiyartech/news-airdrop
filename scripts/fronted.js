function showSection(id) {
  document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function generateUserId() {
  const existing = localStorage.getItem('userId');
  if (existing) return existing;
  const uid = 'TID-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  localStorage.setItem('userId', uid);
  return uid;
}

function renderProfile() {
  document.getElementById('user-id').innerText = generateUserId();
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.getElementById('fav-count').innerText = favs.length;
}

function renderFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const list = document.getElementById('fav-list');
  list.innerHTML = favs.length
    ? favs.map(d => `
        <div class="airdrop">
          <h3>${d.name}</h3>
          <p><strong>Potensi:</strong> ${d.potential}</p>
          <p><strong>Sumber:</strong> ${d.source}</p>
          <a href="${d.link}" target="_blank">🔗 Kunjungi</a>
        </div>
      `).join('')
    : '<p>Belum ada favorit.</p>';
}

function saveToFavorites(drop) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favs.find(item => item.name === drop.name)) {
    favs.push(drop);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('✅ Disimpan ke favorit!');
    renderProfile();
    renderFavorites();
  } else {
    alert('❗ Sudah disimpan sebelumnya.');
  }
}

function logout() {
  localStorage.clear();
  location.reload();
}

fetch('http://localhost:3000/api/airdrops')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('airdrop-list');
    if (!data.length) {
      list.innerHTML = '<p>Data tidak tersedia.</p>';
      return;
    }
    list.innerHTML = data.map(drop => `
      <div class="airdrop">
        <h3>${drop.name}</h3>
        <p><strong>Potensi:</strong> ${drop.potential}</p>
        <p><strong>Sumber:</strong> ${drop.source}</p>
        <a href="${drop.link}" target="_blank">🔗 Kunjungi</a>
        <button onclick='saveToFavorites(${JSON.stringify(drop)})'>❤️ Simpan</button>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error(err);
    document.getElementById('airdrop-list').innerHTML = '<p>Gagal memuat data.</p>';
  });

renderProfile();
renderFavorites();
