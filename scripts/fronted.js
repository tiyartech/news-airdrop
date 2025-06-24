// 👉 Navigasi antar halaman
function showSection(id) {
  document.querySelectorAll('.page').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// 👉 Generate user ID kalau belum ada
function generateUserId() {
  const existing = localStorage.getItem('userId');
  if (existing) return existing;
  const newId = 'TID-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  localStorage.setItem('userId', newId);
  return newId;
}

// 👉 Tampilkan info profil
function renderProfile() {
  document.getElementById('user-id').innerText = generateUserId();
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.getElementById('fav-count').innerText = favs.length;
}

// 👉 Tampilkan favorit
function renderFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const list = document.getElementById('fav-list');
  list.innerHTML = favs.length
    ? favs.map(d => `
      <div class="airdrop">
        <h3>${d.name}</h3>
        <p><strong>Potensi:</strong> ${d.potential || '-'}</p>
        <p><strong>Sumber:</strong> ${d.source || '-'}</p>
        <a href="${d.link}" target="_blank">🔗 Kunjungi</a>
      </div>
    `).join('')
    : '<p>Belum ada favorit.</p>';
}

// 👉 Simpan ke favorit
function saveToFavorites(drop) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favs.find(item => item.name === drop.name)) {
    favs.push(drop);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('✅ Disimpan ke favorit!');
    renderProfile();
    renderFavorites();
  } else {
    alert('❗ Sudah ada di favorit.');
  }
}

// 👉 Logout = clear local storage
function logout() {
  localStorage.clear();
  location.reload();
}

// 👉 Ambil data airdrop real dari backend
fetch('http://localhost:3000/api/airdrops')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('airdrop-list');
    if (!data.length) {
      list.innerHTML = '<p>Tidak ada data tersedia saat ini.</p>';
      return;
    }
    list.innerHTML = data.map(drop => `
      <div class="airdrop">
        <h3>${drop.name}</h3>
        <p><strong>Potensi:</strong> ${drop.potential || 'Tidak diketahui'}</p>
        <p><strong>Sumber:</strong> ${drop.source || 'Unknown'}</p>
        <a href="${drop.link}" target="_blank">🔗 Kunjungi</a>
        <button onclick='saveToFavorites(${JSON.stringify(drop)})'>❤️ Simpan</button>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error(err);
    document.getElementById('airdrop-list').innerHTML = '<p>Gagal memuat data.</p>';
  });

// 👉 Inisialisasi saat halaman dimuat
renderProfile();
renderFavorites();
