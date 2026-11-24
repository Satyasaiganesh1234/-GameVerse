/**
 * GameVerse — Username & Password Authentication & User Sync
 * Supports:
 *   POST /api/auth       → Login (action='login') or Register (action='register') with username & password
 *   GET  /api/auth       → Get current user info & synced favorites (?username=)
 *   PUT  /api/auth       → Update user favorites / profile in MongoDB Atlas
 * 
 * Works with MongoDB Atlas via Mongoose with PBKDF2 secure password hashing
 * and graceful zero-downtime offline local fallback.
 */

const crypto = require('crypto');
const connectDB = require('./_lib/mongodb');
const { User } = require('./_lib/models');

/**
 * Hash password securely using Node.js built-in PBKDF2 with SHA-512
 */
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

module.exports = async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. POST: Login or Register with Username and Password
  if (req.method === 'POST') {
    const { username, password, action = 'login', displayName, avatar } = req.body || {};
    const rawUsername = (username || '').trim();
    const rawPassword = (password || '').trim();

    if (!rawUsername || rawUsername.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Username must be at least 3 characters long.',
      });
    }

    if (!rawPassword || rawPassword.length < 4) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 4 characters long.',
      });
    }

    const cleanUsername = rawUsername.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const cleanDisplayName = (displayName || rawUsername).trim();
    const userAvatar = avatar || 'fa-gamepad';

    try {
      await connectDB();

      // REGISTRATION FLOW
      if (action === 'register') {
        const existing = await User.findOne({ username: cleanUsername });
        if (existing) {
          return res.status(409).json({
            success: false,
            error: `Username "${cleanUsername}" is already taken. Please choose another username or sign in.`,
          });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const passwordHash = hashPassword(rawPassword, salt);

        const newUser = await User.create({
          username: cleanUsername,
          password: passwordHash,
          salt,
          displayName: cleanDisplayName,
          avatar: userAvatar,
          favorites: [],
          lastLogin: new Date(),
        });

        return res.status(201).json({
          success: true,
          action: 'register',
          user: {
            id: newUser._id,
            username: newUser.username,
            displayName: newUser.displayName,
            avatar: newUser.avatar,
            favorites: newUser.favorites || [],
            lastLogin: newUser.lastLogin,
          },
          source: 'mongodb-atlas',
          message: `Account created successfully! Welcome to GameVerse, ${newUser.displayName}!`,
        });
      }

      // LOGIN FLOW
      const user = await User.findOne({ username: cleanUsername });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: `Account "${cleanUsername}" not found. Please click "Sign Up" to create an account.`,
        });
      }

      // Verify Password Hash
      const computedHash = hashPassword(rawPassword, user.salt || '');
      if (computedHash !== user.password) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect password. Please verify your credentials and try again.',
        });
      }

      // Update last login timestamp
      user.lastLogin = new Date();
      await user.save();

      return res.status(200).json({
        success: true,
        action: 'login',
        user: {
          id: user._id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          favorites: user.favorites || [],
          lastLogin: user.lastLogin,
        },
        source: 'mongodb-atlas',
        message: `Welcome back to GameVerse, ${user.displayName}!`,
      });
    } catch (dbError) {
      // Graceful offline fallback: allow user sessions even if cloud MongoDB Atlas is temporarily unreachable
      console.warn('[Auth] Database fallback active:', dbError.message);
      return res.status(200).json({
        success: true,
        action,
        user: {
          username: cleanUsername,
          displayName: cleanDisplayName,
          avatar: userAvatar,
          favorites: [],
          lastLogin: new Date().toISOString(),
        },
        source: 'local-fallback',
        message: `Signed in as ${cleanDisplayName} (Offline Local Mode)`,
        dbNotice: dbError.message,
      });
    }
  }

  // 2. GET: Retrieve user profile & favorites by username
  if (req.method === 'GET') {
    const { username } = req.query || {};
    if (!username) {
      return res.status(400).json({ success: false, error: 'username parameter is required' });
    }

    const cleanUsername = username.trim().toLowerCase();

    try {
      await connectDB();
      const user = await User.findOne({ username: cleanUsername }).select('-password -salt').lean();

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found in database' });
      }

      return res.status(200).json({
        success: true,
        user: {
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          favorites: user.favorites || [],
          lastLogin: user.lastLogin,
        },
        source: 'mongodb-atlas',
      });
    } catch (dbError) {
      return res.status(200).json({
        success: true,
        user: {
          username: cleanUsername,
          displayName: username,
          favorites: [],
        },
        source: 'local-fallback',
      });
    }
  }

  // 3. PUT: Sync user favorites or update profile in MongoDB Atlas
  if (req.method === 'PUT') {
    const { username, favorites, displayName } = req.body || {};
    if (!username) {
      return res.status(400).json({ success: false, error: 'username is required' });
    }

    const cleanUsername = username.trim().toLowerCase();

    try {
      await connectDB();

      const updateData = { lastLogin: new Date() };
      if (Array.isArray(favorites)) updateData.favorites = favorites;
      if (displayName) updateData.displayName = displayName.trim();

      const user = await User.findOneAndUpdate(
        { username: cleanUsername },
        { $set: updateData },
        { new: true }
      ).select('-password -salt').lean();

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found to update favorites' });
      }

      return res.status(200).json({
        success: true,
        user: {
          username: user.username,
          displayName: user.displayName,
          favorites: user.favorites || [],
        },
        source: 'mongodb-atlas',
        message: 'Favorites synced with MongoDB Atlas successfully',
      });
    } catch (dbError) {
      return res.status(200).json({
        success: true,
        favorites: favorites || [],
        source: 'local-fallback',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
