/**
 * GameVerse — Mongoose Schemas & Models
 * Game, Favorite, and Comparison collections.
 */

const mongoose = require('mongoose');

/* ─── Game Schema ─────────────────────────────────────────────── */
const GameSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    platform: { type: [String], required: true },
    releaseYear: { type: Number, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    popularityScore: { type: Number, required: true, min: 0, max: 100 },
    peakPlayers: { type: Number, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    tags: { type: [String], default: [] },
    multiplayer: { type: Boolean, default: false },
    metacriticScore: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true }
);

/* ─── Favorite Schema ─────────────────────────────────────────── */
const FavoriteSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    gameId: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FavoriteSchema.index({ sessionId: 1, gameId: 1 }, { unique: true });

/* ─── Comparison Schema ───────────────────────────────────────── */
const ComparisonSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    gameIds: { type: [String], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ComparisonSchema.index({ sessionId: 1 }, { unique: true });

/* ─── User Schema (Simple Username Login) ─────────────────────── */
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    avatar: { type: String, default: 'fa-gamepad' },
    favorites: { type: [Number], default: [] },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

/* ─── Export Models (avoid recompilation on hot reload) ────────── */
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);
const Comparison = mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = { Game, Favorite, Comparison, User };
