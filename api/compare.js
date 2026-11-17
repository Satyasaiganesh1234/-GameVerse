/**
 * GameVerse — Compare API Endpoint
 * GET  /api/compare?sessionId=  → retrieve comparison queue
 * POST /api/compare             → update comparison queue { sessionId, gameIds: [] }
 */

const connectDB = require('./_lib/mongodb');
const { Comparison } = require('./_lib/models');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();

    /* ─── GET: Retrieve Comparison Queue ────────────────── */
    if (req.method === 'GET') {
      const { sessionId } = req.query;
      if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

      const comparison = await Comparison.findOne({ sessionId }).lean();
      return res.status(200).json(comparison || { sessionId, gameIds: [] });
    }

    /* ─── POST: Update Comparison Queue ─────────────────── */
    if (req.method === 'POST') {
      const { sessionId, gameIds } = req.body || {};
      if (!sessionId || !Array.isArray(gameIds)) {
        return res.status(400).json({ error: 'sessionId and gameIds[] required' });
      }

      if (gameIds.length > 5) {
        return res.status(400).json({ error: 'Maximum 5 games can be compared at once' });
      }

      const comparison = await Comparison.findOneAndUpdate(
        { sessionId },
        { sessionId, gameIds, updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return res.status(200).json(comparison);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Compare API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
