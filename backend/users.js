const fs = require('fs');
const path = './database/users.json';

function loadUsers() {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

function addFavorite(userId, airdropName) {
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  if (user && !user.favorites.includes(airdropName)) {
    user.favorites.push(airdropName);
    saveUsers(users);
  }
}

function createUser() {
  const users = loadUsers();
  const newUser = {
    id: 'USER-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
    favorites: []
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

module.exports = { loadUsers, saveUsers, addFavorite, createUser };
