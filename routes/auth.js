const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.json');

// Helper function to read users
async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write users
async function writeUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const users = await readUsers();
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), username, password: hashedPassword };
  users.push(newUser);
  await writeUsers(users);

  req.session.userId = newUser.id;
  res.json({ message: 'Registration successful', user: { id: newUser.id, username } });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  res.json({ message: 'Login successful', user: { id: user.id, username } });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

async function getCurrentUser(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  // Return user id and username for frontend
  const users = await readUsers();
  const user = users.find(u => u.id === req.session.userId);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  res.json({ userId: user.id, username: user.username });
}

router.get('/me', getCurrentUser);

module.exports = router;
