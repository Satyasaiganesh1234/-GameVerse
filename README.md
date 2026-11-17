# 🎮 GameVerse: Digital Gaming & Exploration Platform

> **Academic Project** — Software Engineering & System Design Course  
> All ratings, popularity indices, and player counts are illustrative sample data.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Guide](#setup-guide)
  - [Windows Laptop (Local)](#windows-laptop-local)
  - [MongoDB Atlas Setup](#mongodb-atlas-setup)
  - [Vercel Deployment](#vercel-deployment)
- [API Documentation](#api-documentation)
- [Pages](#pages)
- [Architecture](#architecture)

---

## 🎯 Overview

GameVerse is a production-ready, full-stack web application that serves as a digital gaming exploration platform. It features 20 curated game entries with rich metadata, an interactive comparison engine, favorites management, Chart.js analytics, and an interactive MongoDB shell simulator.

The application is built with a **hybrid architecture** that works both:
- **Online** — via Vercel Serverless Functions + MongoDB Atlas
- **Offline/Local** — via IndexedDB + localStorage automatic fallback

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Real-time search with 300ms debounce across titles, genres, tags, developers |
| 🏷️ **Multi-Filter** | Filter by genre, platform, minimum rating, with multiple sort options |
| 📊 **Game Comparison** | Side-by-side comparison of up to 5 games with radar & bar charts |
| 💜 **Favorites** | Persistent favorites synced to MongoDB or IndexedDB |
| 🎬 **Trailer Modals** | YouTube trailer player with keyboard dismiss (Escape) |
| 🗄️ **MongoDB Shell** | Interactive simulated mongosh with real database queries |
| 🎨 **SVG Covers** | Auto-generated genre-colored SVG placeholders when images are missing |
| 📱 **Responsive** | Mobile-first design with hamburger nav, works on all screen sizes |
| 🌙 **Neon UI** | Glassmorphism, neon glow effects, smooth CSS animations |
| 📈 **Chart.js Analytics** | Doughnut, Bar, and Radar chart visualizations |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla ES6+ JavaScript |
| **Backend** | Node.js, Vercel Serverless Functions |
| **Database** | MongoDB Atlas, Mongoose 7.x ODM |
| **Charts** | Chart.js 4.x |
| **Fonts** | Google Fonts (Inter, Orbitron) |
| **Fallback** | IndexedDB API, localStorage API |
| **Deployment** | Vercel (production), `npx serve` (local) |

---

## 📁 Project Structure

```
GameVerse-Project/
├── api/
│   ├── _lib/
│   │   ├── mongodb.js        # Global cached Mongoose connection
│   │   ├── models.js         # Mongoose schemas: Game, Favorite, Comparison
│   │   └── seedData.js       # 20 games with full metadata
│   ├── games.js              # GET /api/games (filters, search, sort)
│   ├── favorites.js          # GET, POST, DELETE /api/favorites
│   ├── compare.js            # GET, POST /api/compare
│   └── seed.js               # POST /api/seed (idempotent)
├── public/
│   ├── images/               # Game cover images (user-provided)
│   ├── index.html            # Home page
│   ├── explore.html          # Explore & filter games
│   ├── game-details.html     # Game details with analytics
│   ├── compare.html          # Ratings & popularity comparison
│   ├── favorites.html        # Favorites collection
│   ├── mongodb.html          # Interactive MongoDB shell
│   ├── about.html            # SE & System Design documentation
│   ├── css/styles.css        # Neon glassmorphism styles
│   └── js/
│       ├── catalog-data.js   # 20-game dataset + SVG generator
│       ├── db-client.js      # Hybrid data layer (API + IndexedDB)
│       └── app.js            # Page controllers + Chart.js
├── .env.example              # Environment variables template
├── package.json              # Dependencies (mongoose)
├── vercel.json               # Vercel serverless config
└── README.md                 # This file
```

---

## 🚀 Setup Guide

### Windows Laptop (Local)

#### Method 1: Instant Zero-Install Launcher (Recommended)
Simply double-click:
```text
start-local.bat
```
or open `public/index.html` directly in Google Chrome, Microsoft Edge, or Firefox. The built-in **Hybrid Data Layer (`db-client.js`)** automatically engages IndexedDB and `localStorage`, providing 100% full application functionality without requiring Node.js, Python, or local servers!

#### Method 2: Node.js Full-Stack Server
**Prerequisites:** Node.js 18+ installed ([nodejs.org](https://nodejs.org))

```bash
# 1. Navigate to the project directory
cd GameVerse-Project

# 2. Run the integrated local server
npm start
# -> http://localhost:3000
```

> **Note:** Without MongoDB configured, the app automatically uses IndexedDB + localStorage. All features work offline!

---

### MongoDB Atlas Setup

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free-tier cluster (M0 Sandbox)
3. Create a database user with read/write access
4. Whitelist your IP address (or `0.0.0.0/0` for Vercel)
5. Get your connection string

```bash
# 6. Create .env file from template
copy .env.example .env

# 7. Edit .env with your Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/gameverse_db
```

**Seed the database:**
```bash
# Using the API endpoint (once the app is running)
curl -X POST http://localhost:3000/api/seed
```

Or use the **Seed Database** button on the MongoDB Shell page.

---

### Vercel Deployment

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
4. Click **Deploy** — done!

The `vercel.json` configuration handles routing automatically.

---

## 📡 API Documentation

### Games

| Method | Endpoint | Parameters | Description |
|--------|----------|------------|-------------|
| GET | `/api/games` | `?genre=`, `?platform=`, `?minRating=`, `?sort=`, `?search=` | List/filter games |
| GET | `/api/games?id=game-01` | `?id=` | Get single game by ID |

**Sort options:** `rating-desc`, `rating-asc`, `title-asc`, `title-desc`, `year-desc`, `year-asc`, `popularity-desc`, `popularity-asc`, `players-desc`

### Favorites

| Method | Endpoint | Body/Query | Description |
|--------|----------|------------|-------------|
| GET | `/api/favorites` | `?sessionId=` | List user favorites |
| POST | `/api/favorites` | `{ sessionId, gameId }` | Add to favorites |
| DELETE | `/api/favorites` | `{ sessionId, gameId }` | Remove from favorites |

### Compare

| Method | Endpoint | Body/Query | Description |
|--------|----------|------------|-------------|
| GET | `/api/compare` | `?sessionId=` | Get comparison queue |
| POST | `/api/compare` | `{ sessionId, gameIds[] }` | Update queue (max 5) |

### Seed

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seed` | Idempotent database seeding (20 games) |

---

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Hero, stats, featured & top-rated games |
| **Explore** | `/explore.html` | Full catalog with filters, search, grid/list view |
| **Game Details** | `/game-details.html?id=game-XX` | Individual game with charts |
| **Compare** | `/compare.html` | Side-by-side comparison with radar & bar charts |
| **Favorites** | `/favorites.html` | User's saved favorites |
| **DB Shell** | `/mongodb.html` | Interactive MongoDB shell simulator |
| **About** | `/about.html` | Technical documentation |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │index.html│  │explore   │  │details   │  │compare   │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       └──────────────┴──────────────┴──────────────┘         │
│                          ↓                                    │
│              ┌──── db-client.js ────┐                        │
│              │  Hybrid Data Layer   │                        │
│              └───┬─────────────┬────┘                        │
│                  ↓             ↓                              │
│        ┌─────────────┐  ┌───────────────┐                    │
│        │  Vercel API  │  │  IndexedDB +  │                   │
│        │  /api/*      │  │  localStorage │                   │
│        └──────┬───────┘  └───────────────┘                   │
│               ↓            (Fallback)                        │
└───────────────┼──────────────────────────────────────────────┘
                ↓
       ┌────────────────┐
       │  MongoDB Atlas  │
       │  (Mongoose)     │
       └────────────────┘
```

---

## 📝 License

This project is for **academic use only**. All technologies used are free and open-source.

---

## ⚠️ Disclaimer

All game data, ratings, popularity scores, peak player counts, and metacritic scores displayed in this application are **illustrative sample data** created for academic demonstration purposes. They do **not** represent live commercial telemetry or real-time statistics. No real-money transactions, payment gateways, or commercial subscriptions are implemented.

# -GameVerse
