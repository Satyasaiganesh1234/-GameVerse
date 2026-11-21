/**
 * GameVerse — Simple Username/Name Authentication & User Sync
 * Supports:
 *   POST /api/auth       → Login / Register by username or name
 *   GET  /api/auth       → Get current user info & synced favorites (?username=)
 *   PUT  /api/auth       → Update user favorites / profile
 * 
 * Works with MongoDB Atlas via Mongoose with automatic offline local fallback.
 */

const connectDB = require('./_lib/mongodb');
const { User } = require('./_lib/models');

module.exports = async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. POST: Simple Username/Name Login or Registration
  if (req.method === 'POST') {
    const { username, name, avatar } = req.body || {};
    const rawInput = (username || name || '').trim();

    if (!rawInput || rawInput.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a username or name of at least 2 characters.',
      });
    }

    const cleanUsername = rawInput.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const cleanDisplayName = rawInput;
    const userAvatar = avatar || 'fa-gamepad';

    try {
      await connectDB();

      // Upsert user in MongoDB
      const user = await User.findOneAndUpdate(
        { username: cleanUsername },
        {
          $set: {
            displayName: cleanDisplayName,
            avatar: userAvatar,
            lastLogin: new Date(),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          favorites: user.favorites || [],
          lastLogin: user.lastLogin,
        },
        source: 'mongodb-atlas',
        message: `Welcome to GameVerse, ${user.displayName}!`,
      });
    } catch (dbError) {
      // Graceful offline fallback: allows seamless offline operation on laptops without MongoDB credentials
      return res.status(200).json({
        success: true,
        user: {
          username: cleanUsername,
          displayName: cleanDisplayName,
          avatar: userAvatar,
          favorites: [],
          lastLogin: new Date().toISOString(),
        },
        source: 'local-fallback',
        message: `Logged in as ${cleanDisplayName} (Offline Local Mode)`,
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
      const user = await User.findOne({ username: cleanUsername }).lean();

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

  // 3. PUT: Sync user favorites or update profile
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
        { new: true, upsert: true }
      ).lean();

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
