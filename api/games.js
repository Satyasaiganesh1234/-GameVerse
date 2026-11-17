/**
 * GameVerse — Games API Endpoint
 * GET /api/games
 * Supports: ?genre=, ?platform=, ?minRating=, ?sort=, ?search=, ?id=
 */

const connectDB = require('./_lib/mongodb');
const { Game } = require('./_lib/models');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await connectDB();

    const { genre, platform, minRating, sort, search, id } = req.query;

    // Single game by ID
    if (id) {
      const game = await Game.findOne({ gameId: id }).lean();
      if (!game) return res.status(404).json({ error: 'Game not found' });
      return res.status(200).json(game);
    }

    // Build filter query
    const filter = {};

    if (genre) {
      const genres = genre.split(',').map((g) => g.trim());
      filter.genre = { $in: genres };
    }

    if (platform) {
      const platforms = platform.split(',').map((p) => p.trim());
      filter.platform = { $in: platforms };
    }

    if (minRating) {
      const rating = parseFloat(minRating);
      if (!isNaN(rating)) {
        filter.rating = { $gte: rating };
      }
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { developer: regex },
        { tags: regex },
      ];
    }

    // Build sort
    let sortOption = { popularityScore: -1 }; // default sort
    if (sort) {
      switch (sort) {
        case 'rating-desc':
          sortOption = { rating: -1 };
          break;
        case 'rating-asc':
          sortOption = { rating: 1 };
          break;
        case 'title-asc':
          sortOption = { title: 1 };
          break;
        case 'title-desc':
          sortOption = { title: -1 };
          break;
        case 'year-desc':
          sortOption = { releaseYear: -1 };
          break;
        case 'year-asc':
          sortOption = { releaseYear: 1 };
          break;
        case 'popularity-desc':
          sortOption = { popularityScore: -1 };
          break;
        case 'popularity-asc':
          sortOption = { popularityScore: 1 };
          break;
        case 'players-desc':
          sortOption = { peakPlayers: -1 };
          break;
        default:
          sortOption = { popularityScore: -1 };
      }
    }

    const games = await Game.find(filter).sort(sortOption).lean();
    return res.status(200).json(games);
  } catch (error) {
    console.error('Games API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
