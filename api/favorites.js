/**
 * GameVerse — Favorites API Endpoint
 * GET    /api/favorites?sessionId=  → list favorites
 * POST   /api/favorites             → add favorite { sessionId, gameId }
 * DELETE /api/favorites             → remove favorite { sessionId, gameId }
 */

const connectDB = require('./_lib/mongodb');
const { Favorite } = require('./_lib/models');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();

    /* ─── GET: List Favorites ───────────────────────────── */
    if (req.method === 'GET') {
      const { sessionId } = req.query;
      if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

      const favorites = await Favorite.find({ sessionId }).sort({ addedAt: -1 }).lean();
      return res.status(200).json(favorites);
    }

    /* ─── POST: Add Favorite ────────────────────────────── */
    if (req.method === 'POST') {
      const { sessionId, gameId } = req.body || {};
      if (!sessionId || !gameId) {
        return res.status(400).json({ error: 'sessionId and gameId required' });
      }

      // Upsert to avoid duplicates
      const fav = await Favorite.findOneAndUpdate(
        { sessionId, gameId },
        { sessionId, gameId, addedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return res.status(201).json(fav);
    }

    /* ─── DELETE: Remove Favorite ───────────────────────── */
    if (req.method === 'DELETE') {
      const { sessionId, gameId } = req.body || {};
      if (!sessionId || !gameId) {
        return res.status(400).json({ error: 'sessionId and gameId required' });
      }

      await Favorite.deleteOne({ sessionId, gameId });
      return res.status(200).json({ success: true, message: 'Favorite removed' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Favorites API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
