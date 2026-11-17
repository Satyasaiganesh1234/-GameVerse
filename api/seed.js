/**
 * GameVerse — Seed API Endpoint
 * POST /api/seed → Idempotent auto-seeding of 20 games into MongoDB
 */

const connectDB = require('./_lib/mongodb');
const { Game } = require('./_lib/models');
const seedGames = require('./_lib/seedData');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  try {
    await connectDB();

    const existingCount = await Game.countDocuments();

    if (existingCount >= 20) {
      return res.status(200).json({
        success: true,
        message: `Database already seeded with ${existingCount} games. Skipping.`,
        count: existingCount,
        seeded: false,
      });
    }

    // Use bulkWrite with upsert for idempotent seeding
    const bulkOps = seedGames.map((game) => ({
      updateOne: {
        filter: { gameId: game.gameId },
        update: { $setOnInsert: game },
        upsert: true,
      },
    }));

    const result = await Game.bulkWrite(bulkOps);

    const finalCount = await Game.countDocuments();

    return res.status(201).json({
      success: true,
      message: `Database seeded successfully!`,
      count: finalCount,
      inserted: result.upsertedCount,
      seeded: true,
    });
  } catch (error) {
    console.error('Seed API Error:', error);
    return res.status(500).json({ error: 'Seeding failed', message: error.message });
  }
};
