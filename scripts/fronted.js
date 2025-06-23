// 👉 Navigasi antar menu
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

// 👉 Generate ID user acak kalau belum ada
function generateUserId() {
  const existing = localStorage.getItem('userId');
  if (existing) return existing;
  const uid = 'TID-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  localStorage.setItem('userId', uid);
  return uid;
}

// 👉 Render Profil
function renderProfile() {
  const userId = generateUserId();
  document.getElementById('user-id').innerText = userId;

  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.getElementById('fav-count').innerText = favs.length;
}

// 👉 Render daftar favorit
function renderFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const list = document.getElementById('fav-list');
  list.innerHTML = '';

  if (favs.length === 0) {
    list.innerHTML = '<p>Belum ada favorit.</p>';
    return;
  }

  favs.forEach(drop => {
    const div = document.createElement('div');
    div.className = 'airdrop';
    div.innerHTML = `
      <h3>${drop.name}</h3>
      <p><strong>Benefit:</strong> ${drop.benefit}</p>
      <p><strong>Potensi:</strong> ${drop.potential}</p>
      <a href="${drop.link}" target="_blank">🔗 Join Airdrop</a>
    `;
    list.appendChild(div);
  });
}

// 👉 Ambil data dari backend & render
fetch('http://localhost:3000/api/airdrops')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('airdrop-list');
    list.innerHTML = '';
    data.forEach(drop => {
      const div = document.createElement('div');
      div.className = 'airdrop';
      div.innerHTML = `
        <h3>${drop.name}</h3>
        <p><strong>Benefit:</strong> ${drop.benefit}</p>
        <p><strong>Potensi:</strong> ${drop.potential}</p>
        <a href="${drop.link}" target="_blank">🔗 Join</a>
        <button onclick='saveToFavorites(${JSON.stringify(drop)})'>❤️ Simpan</button>
      `;
      list.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('airdrop-list').innerHTML = '<p>Gagal ambil data.</p>';
  });

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

// 👉 Inisialisasi
renderProfile();
renderFavorites();
