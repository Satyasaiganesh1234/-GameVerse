/**
 * GameVerse — Diagnostic Health Check & MongoDB Connectivity Status
 * GET /api/health
 * 
 * Verifies if Vercel serverless functions have access to the live MongoDB Atlas cluster,
 * checks process.env.MONGODB_URI, and diagnoses any firewall/whitelist issues.
 */

const mongoose = require('mongoose');
const connectDB = require('./_lib/mongodb');
const { User } = require('./_lib/models');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasEnvUri = Boolean(process.env.MONGODB_URI);

  if (!hasEnvUri) {
    return res.status(200).json({
      status: 'warning',
      mongoConnected: false,
      reason: 'MONGODB_URI is NOT defined in Vercel Environment Variables.',
      actionRequired: [
        '1. Go to your Vercel Dashboard -> GameVerse Project -> Settings -> Environment Variables.',
        '2. Add Key: MONGODB_URI',
        '3. Add Value: your MongoDB Atlas connection string (mongodb+srv://...)',
        '4. Check Production, Preview, and Development, then click Save.',
        '5. Redeploy your project in Vercel so the serverless functions pick up the environment variable.'
      ],
      timestamp: new Date().toISOString()
    });
  }

  try {
    await connectDB();
    const readyState = mongoose.connection.readyState; // 1 = connected
    const userCount = await User.countDocuments();

    return res.status(200).json({
      status: 'ok',
      mongoConnected: readyState === 1,
      databaseName: mongoose.connection.name,
      registeredUsersCount: userCount,
      message: 'MongoDB Atlas is fully connected and operational on Vercel!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      mongoConnected: false,
      errorMessage: error.message,
      troubleshooting: [
        'If the error mentions MongoServerSelectionError or connection timeout (ETIMEDOUT):',
        'In MongoDB Atlas, go to Network Access -> Add IP Address -> choose "Allow Access From Anywhere" (0.0.0.0/0).',
        'Vercel serverless functions run across dynamic IP ranges, so 0.0.0.0/0 must be allowed in MongoDB Atlas.'
      ],
      timestamp: new Date().toISOString()
    });
  }
};
