/**
 * GameVerse — Complete 20-Game Client-Side Dataset
 * Multi-path image resolver + SVG cover generator fallback.
 * This is the authoritative client-side data source used when MongoDB API is unreachable.
 */

/* ─── SVG Cover Generator ────────────────────────────────────────── */
const GENRE_COLORS = {
  RPG: ['#8B5CF6', '#6D28D9'],
  Action: ['#EF4444', '#DC2626'],
  Adventure: ['#10B981', '#059669'],
  'Open World': ['#3B82F6', '#2563EB'],
  Indie: ['#F59E0B', '#D97706'],
  'Hack and Slash': ['#EC4899', '#DB2777'],
  Roguelike: ['#F97316', '#EA580C'],
  Metroidvania: ['#14B8A6', '#0D9488'],
  'Souls-like': ['#6B7280', '#4B5563'],
  Sandbox: ['#84CC16', '#65A30D'],
  Survival: ['#78716C', '#57534E'],
  JRPG: ['#A855F7', '#9333EA'],
  'Turn-Based': ['#6366F1', '#4F46E5'],
  Simulation: ['#22D3EE', '#06B6D4'],
  Platformer: ['#FB923C', '#F97316'],
};

function getGenreGradient(genres) {
  for (const g of genres) {
    if (GENRE_COLORS[g]) return GENRE_COLORS[g];
  }
  return ['#6366F1', '#4F46E5'];
}

function generateSVGCover(game) {
  const [c1, c2] = getGenreGradient(game.genre);
  const initials = game.title
    .split(/[\s:]+/)
    .filter((w) => w.length > 0)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join('');
  const id = game.gameId.replace(/[^a-zA-Z0-9]/g, '');

  return `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
  <defs>
    <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="100%" style="stop-color:${c2}"/>
    </linearGradient>
    <filter id="glow-${id}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="400" height="560" rx="16" fill="url(#bg-${id})"/>
  <rect x="20" y="20" width="360" height="520" rx="12" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <text x="200" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="80" font-weight="bold" fill="rgba(255,255,255,0.9)" filter="url(#glow-${id})">${initials}</text>
  <text x="200" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="rgba(255,255,255,0.7)" font-weight="600">${game.genre[0].toUpperCase()}</text>
  <text x="200" y="400" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.5)">${game.releaseYear} · ★ ${game.rating}</text>
  <circle cx="200" cy="490" r="24" fill="rgba(255,255,255,0.15)"/>
  <text x="200" y="496" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="white">▶</text>
</svg>`)}`;
}

/* ─── Multi-Path Image Resolver ──────────────────────────────────── */
function resolveImagePath(game) {
  const paths = [
    game.coverImage,
    `/images/${game.gameId}.jpg`,
    `/images/${game.gameId}.png`,
    `/images/${game.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`,
  ].filter(Boolean);

  return paths;
}

function loadGameImage(imgElement, game) {
  const paths = resolveImagePath(game);
  let idx = 0;

  function tryNext() {
    if (idx < paths.length) {
      imgElement.src = paths[idx];
      idx++;
    } else {
      imgElement.src = generateSVGCover(game);
    }
  }

  imgElement.onerror = tryNext;
  tryNext();
}

/* ─── Complete 20-Game Dataset ───────────────────────────────────── */
const CATALOG_DATA = [
  {
    gameId: 'game-01',
    title: 'The Witcher 3: Wild Hunt',
    genre: ['RPG', 'Action', 'Open World'],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
    releaseYear: 2015,
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    rating: 9.5,
    popularityScore: 95,
    peakPlayers: 603346,
    description: 'An epic open-world RPG where you play as Geralt of Rivia, a monster hunter searching for his adopted daughter. Features a massive world filled with meaningful choices, complex characters, and unforgettable quests across war-ravaged lands.',
    coverImage: '/images/witcher3.jpg',
    trailerUrl: 'https://www.youtube.com/embed/c0i88t0Kacs',
    tags: ['Story Rich', 'Fantasy', 'Choices Matter', 'Dark Fantasy'],
    multiplayer: false,
    metacriticScore: 92,
  },
  {
    gameId: 'game-02',
    title: 'Red Dead Redemption 2',
    genre: ['Action', 'Adventure', 'Open World'],
    platform: ['PC', 'PlayStation 4', 'Xbox One'],
    releaseYear: 2018,
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    rating: 9.7,
    popularityScore: 97,
    peakPlayers: 566624,
    description: "An epic tale of life in America's unforgiving heartland. Arthur Morgan must deal with the decline of the outlaw era as federal agents pursue his gang across the country.",
    coverImage: '/images/rdr2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/eaW0tYpxyp0',
    tags: ['Western', 'Story Rich', 'Atmospheric', 'Realistic'],
    multiplayer: true,
    metacriticScore: 97,
  },
  {
    gameId: 'game-03',
    title: 'God of War (2018)',
    genre: ['Action', 'Adventure', 'Hack and Slash'],
    platform: ['PlayStation 4', 'PC'],
    releaseYear: 2018,
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.6,
    popularityScore: 93,
    peakPlayers: 733230,
    description: 'Kratos returns in a Norse mythology setting with his son Atreus. A deeply personal story with brutal, satisfying combat and breathtaking visuals.',
    coverImage: '/images/godofwar.jpg',
    trailerUrl: 'https://www.youtube.com/embed/K0u_kAWLJOA',
    tags: ['Mythology', 'Cinematic', 'Singleplayer', 'Action RPG'],
    multiplayer: false,
    metacriticScore: 94,
  },
  {
    gameId: 'game-04',
    title: 'Elden Ring',
    genre: ['RPG', 'Action', 'Open World'],
    platform: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Xbox Series X/S'],
    releaseYear: 2022,
    developer: 'FromSoftware',
    publisher: 'Bandai Namco Entertainment',
    rating: 9.5,
    popularityScore: 96,
    peakPlayers: 953426,
    description: 'A vast action RPG set in the Lands Between, created by Hidetaka Miyazaki and George R.R. Martin.',
    coverImage: '/images/eldenring.jpg',
    trailerUrl: 'https://www.youtube.com/embed/E3Huy2cdih0',
    tags: ['Souls-like', 'Dark Fantasy', 'Challenging', 'Exploration'],
    multiplayer: true,
    metacriticScore: 96,
  },
  {
    gameId: 'game-05',
    title: 'The Legend of Zelda: Breath of the Wild',
    genre: ['Adventure', 'Action', 'Open World'],
    platform: ['Nintendo Switch', 'Wii U'],
    releaseYear: 2017,
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    rating: 9.8,
    popularityScore: 98,
    peakPlayers: 420000,
    description: 'Step into a world of discovery, exploration, and adventure in this open-air adventure that redefines the Zelda franchise.',
    coverImage: '/images/zelda-botw.jpg',
    trailerUrl: 'https://www.youtube.com/embed/zw47_q9wbBE',
    tags: ['Exploration', 'Puzzle', 'Fantasy', 'Nintendo'],
    multiplayer: false,
    metacriticScore: 97,
  },
  {
    gameId: 'game-06',
    title: 'Cyberpunk 2077',
    genre: ['RPG', 'Action', 'Open World'],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    releaseYear: 2020,
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    rating: 8.5,
    popularityScore: 85,
    peakPlayers: 1054388,
    description: 'An open-world action-adventure RPG set in the megalopolis of Night City.',
    coverImage: '/images/cyberpunk2077.jpg',
    trailerUrl: 'https://www.youtube.com/embed/8X2kIfS6fb8',
    tags: ['Cyberpunk', 'Sci-Fi', 'Futuristic', 'FPS'],
    multiplayer: false,
    metacriticScore: 86,
  },
  {
    gameId: 'game-07',
    title: 'Hades',
    genre: ['Roguelike', 'Action', 'Indie'],
    platform: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'],
    releaseYear: 2020,
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    rating: 9.3,
    popularityScore: 90,
    peakPlayers: 55747,
    description: 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.',
    coverImage: '/images/hades.jpg',
    trailerUrl: 'https://www.youtube.com/embed/91t0ha9x0AE',
    tags: ['Roguelike', 'Greek Mythology', 'Fast-Paced', 'Indie'],
    multiplayer: false,
    metacriticScore: 93,
  },
  {
    gameId: 'game-08',
    title: 'Hollow Knight',
    genre: ['Metroidvania', 'Action', 'Indie'],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
    releaseYear: 2017,
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    rating: 9.1,
    popularityScore: 88,
    peakPlayers: 28793,
    description: 'An epic action-adventure through a vast ruined kingdom of insects and heroes.',
    coverImage: '/images/hollowknight.jpg',
    trailerUrl: 'https://www.youtube.com/embed/UAO2urG23S4',
    tags: ['Atmospheric', '2D', 'Challenging', 'Exploration'],
    multiplayer: false,
    metacriticScore: 87,
  },
  {
    gameId: 'game-09',
    title: 'Ghost of Tsushima',
    genre: ['Action', 'Adventure', 'Open World'],
    platform: ['PlayStation 4', 'PlayStation 5', 'PC'],
    releaseYear: 2020,
    developer: 'Sucker Punch Productions',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.2,
    popularityScore: 89,
    peakPlayers: 74891,
    description: 'Samurai warrior Jin Sakai protects Tsushima Island during the first Mongol invasion of Japan.',
    coverImage: '/images/ghostoftsushima.jpg',
    trailerUrl: 'https://www.youtube.com/embed/iqysmS4lxwQ',
    tags: ['Samurai', 'Historical', 'Beautiful', 'Combat'],
    multiplayer: true,
    metacriticScore: 83,
  },
  {
    gameId: 'game-10',
    title: 'Horizon Zero Dawn',
    genre: ['Action', 'RPG', 'Open World'],
    platform: ['PlayStation 4', 'PC'],
    releaseYear: 2017,
    developer: 'Guerrilla Games',
    publisher: 'Sony Interactive Entertainment',
    rating: 8.9,
    popularityScore: 86,
    peakPlayers: 56557,
    description: 'Young hunter Aloy explores a lush, post-apocalyptic world dominated by colossal machines.',
    coverImage: '/images/horizonzerodawn.jpg',
    trailerUrl: 'https://www.youtube.com/embed/u4-FCsiF5x4',
    tags: ['Post-Apocalyptic', 'Sci-Fi', 'Female Protagonist', 'Robots'],
    multiplayer: false,
    metacriticScore: 89,
  },
  {
    gameId: 'game-11',
    title: 'Dark Souls III',
    genre: ['RPG', 'Action', 'Souls-like'],
    platform: ['PC', 'PlayStation 4', 'Xbox One'],
    releaseYear: 2016,
    developer: 'FromSoftware',
    publisher: 'Bandai Namco Entertainment',
    rating: 9.0,
    popularityScore: 87,
    peakPlayers: 129975,
    description: 'Journey into a universe of fallen lords and fearsome creatures in this punishing action RPG.',
    coverImage: '/images/darksouls3.jpg',
    trailerUrl: 'https://www.youtube.com/embed/cWBwFhUv1-8',
    tags: ['Souls-like', 'Dark Fantasy', 'Challenging', 'Co-op'],
    multiplayer: true,
    metacriticScore: 89,
  },
  {
    gameId: 'game-12',
    title: 'Sekiro: Shadows Die Twice',
    genre: ['Action', 'Adventure', 'Souls-like'],
    platform: ['PC', 'PlayStation 4', 'Xbox One'],
    releaseYear: 2019,
    developer: 'FromSoftware',
    publisher: 'Activision',
    rating: 9.4,
    popularityScore: 91,
    peakPlayers: 124334,
    description: 'Carve your own path to vengeance in late 1500s Sengoku Japan as the "one-armed wolf."',
    coverImage: '/images/sekiro.jpg',
    trailerUrl: 'https://www.youtube.com/embed/rXMX4YJ7Lks',
    tags: ['Ninja', 'Japanese', 'Challenging', 'Stealth'],
    multiplayer: false,
    metacriticScore: 90,
  },
  {
    gameId: 'game-13',
    title: 'Minecraft',
    genre: ['Sandbox', 'Survival', 'Adventure'],
    platform: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile'],
    releaseYear: 2011,
    developer: 'Mojang Studios',
    publisher: 'Xbox Game Studios',
    rating: 9.2,
    popularityScore: 99,
    peakPlayers: 2000000,
    description: 'Explore infinite worlds and build everything from homes to castles in this blocky, procedurally generated 3D world.',
    coverImage: '/images/minecraft.jpg',
    trailerUrl: 'https://www.youtube.com/embed/MmB9b5njVbA',
    tags: ['Creative', 'Building', 'Multiplayer', 'Endless'],
    multiplayer: true,
    metacriticScore: 93,
  },
  {
    gameId: 'game-14',
    title: 'Grand Theft Auto V',
    genre: ['Action', 'Adventure', 'Open World'],
    platform: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S'],
    releaseYear: 2013,
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    rating: 9.6,
    popularityScore: 98,
    peakPlayers: 364548,
    description: 'Three criminals plan daring heists across the sprawling city of Los Santos.',
    coverImage: '/images/gtav.jpg',
    trailerUrl: 'https://www.youtube.com/embed/QkkoHAzjnUs',
    tags: ['Crime', 'Satire', 'Multiplayer', 'Open World'],
    multiplayer: true,
    metacriticScore: 96,
  },
  {
    gameId: 'game-15',
    title: 'The Last of Us Part II',
    genre: ['Action', 'Adventure', 'Survival'],
    platform: ['PlayStation 4', 'PlayStation 5'],
    releaseYear: 2020,
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.3,
    popularityScore: 92,
    peakPlayers: 310000,
    description: 'Ellie embarks on a relentless journey of revenge in the post-pandemic United States.',
    coverImage: '/images/tlou2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/vhII1qlcZ4E',
    tags: ['Post-Apocalyptic', 'Emotional', 'Stealth', 'Story Rich'],
    multiplayer: false,
    metacriticScore: 93,
  },
  {
    gameId: 'game-16',
    title: 'Persona 5 Royal',
    genre: ['JRPG', 'RPG', 'Turn-Based'],
    platform: ['PlayStation 4', 'PlayStation 5', 'PC', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'],
    releaseYear: 2020,
    developer: 'Atlus',
    publisher: 'Atlus / Sega',
    rating: 9.5,
    popularityScore: 91,
    peakPlayers: 54116,
    description: 'Don the mask of Joker and lead the Phantom Thieves in this stylish JRPG.',
    coverImage: '/images/persona5.jpg',
    trailerUrl: 'https://www.youtube.com/embed/o6AsU1Yp6rw',
    tags: ['Stylish', 'Anime', 'Social Sim', 'Turn-Based'],
    multiplayer: false,
    metacriticScore: 95,
  },
  {
    gameId: 'game-17',
    title: 'Final Fantasy VII Remake',
    genre: ['JRPG', 'Action', 'RPG'],
    platform: ['PlayStation 4', 'PlayStation 5', 'PC'],
    releaseYear: 2020,
    developer: 'Square Enix',
    publisher: 'Square Enix',
    rating: 9.1,
    popularityScore: 88,
    peakPlayers: 42898,
    description: 'A spectacular reimagining of the iconic JRPG. Cloud Strife joins AVALANCHE to fight the Shinra corporation.',
    coverImage: '/images/ff7remake.jpg',
    trailerUrl: 'https://www.youtube.com/embed/sz5TBHzZmdM',
    tags: ['Classic', 'Remake', 'Cinematic', 'Fantasy'],
    multiplayer: false,
    metacriticScore: 87,
  },
  {
    gameId: 'game-18',
    title: 'Stardew Valley',
    genre: ['Simulation', 'RPG', 'Indie'],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Mobile'],
    releaseYear: 2016,
    developer: 'ConcernedApe',
    publisher: 'ConcernedApe',
    rating: 9.0,
    popularityScore: 92,
    peakPlayers: 94569,
    description: 'Escape to the countryside and build the farm of your dreams in this beloved farming simulation RPG.',
    coverImage: '/images/stardewvalley.jpg',
    trailerUrl: 'https://www.youtube.com/embed/8A7A1X1TVNc',
    tags: ['Farming', 'Relaxing', 'Pixel Art', 'Life Sim'],
    multiplayer: true,
    metacriticScore: 89,
  },
  {
    gameId: 'game-19',
    title: 'Celeste',
    genre: ['Platformer', 'Indie', 'Action'],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
    releaseYear: 2018,
    developer: 'Maddy Makes Games',
    publisher: 'Maddy Makes Games',
    rating: 9.2,
    popularityScore: 84,
    peakPlayers: 12422,
    description: 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain.',
    coverImage: '/images/celeste.jpg',
    trailerUrl: 'https://www.youtube.com/embed/70d9irlxiB4',
    tags: ['Precision', 'Emotional', 'Pixel Art', 'Difficult'],
    multiplayer: false,
    metacriticScore: 92,
  },
  {
    gameId: 'game-20',
    title: 'Disco Elysium',
    genre: ['RPG', 'Adventure', 'Indie'],
    platform: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'],
    releaseYear: 2019,
    developer: 'ZA/UM',
    publisher: 'ZA/UM',
    rating: 9.6,
    popularityScore: 87,
    peakPlayers: 23675,
    description: 'A groundbreaking RPG where you are a detective with a unique skill system.',
    coverImage: '/images/discoelysium.jpg',
    trailerUrl: 'https://www.youtube.com/embed/JELHL6a3rRc',
    tags: ['Detective', 'Narrative', 'Choices Matter', 'Unique'],
    multiplayer: false,
    metacriticScore: 91,
  },
];

/* ─── Helper Functions ───────────────────────────────────────────── */

function getAllGenres() {
  const genres = new Set();
  CATALOG_DATA.forEach((g) => g.genre.forEach((genre) => genres.add(genre)));
  return Array.from(genres).sort();
}

function getAllPlatforms() {
  const platforms = new Set();
  CATALOG_DATA.forEach((g) => g.platform.forEach((p) => platforms.add(p)));
  return Array.from(platforms).sort();
}

function getAllTags() {
  const tags = new Set();
  CATALOG_DATA.forEach((g) => g.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

function getGameById(id) {
  return CATALOG_DATA.find((g) => g.gameId === id) || null;
}

function getTopRated(n = 5) {
  return [...CATALOG_DATA].sort((a, b) => b.rating - a.rating).slice(0, n);
}

function getMostPopular(n = 5) {
  return [...CATALOG_DATA].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, n);
}

function searchGames(query) {
  const q = query.toLowerCase();
  return CATALOG_DATA.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q)) ||
      g.genre.some((gen) => gen.toLowerCase().includes(q))
  );
}

function filterGames({ genre, platform, minRating, sort }) {
  let results = [...CATALOG_DATA];

  if (genre) {
    const genres = Array.isArray(genre) ? genre : [genre];
    results = results.filter((g) => g.genre.some((gg) => genres.includes(gg)));
  }

  if (platform) {
    const platforms = Array.isArray(platform) ? platform : [platform];
    results = results.filter((g) => g.platform.some((p) => platforms.includes(p)));
  }

  if (minRating) {
    results = results.filter((g) => g.rating >= parseFloat(minRating));
  }

  if (sort) {
    switch (sort) {
      case 'rating-desc':     results.sort((a, b) => b.rating - a.rating); break;
      case 'rating-asc':      results.sort((a, b) => a.rating - b.rating); break;
      case 'title-asc':       results.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc':      results.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'year-desc':       results.sort((a, b) => b.releaseYear - a.releaseYear); break;
      case 'year-asc':        results.sort((a, b) => a.releaseYear - b.releaseYear); break;
      case 'popularity-desc': results.sort((a, b) => b.popularityScore - a.popularityScore); break;
      case 'popularity-asc':  results.sort((a, b) => a.popularityScore - b.popularityScore); break;
      case 'players-desc':    results.sort((a, b) => b.peakPlayers - a.peakPlayers); break;
      default:                results.sort((a, b) => b.popularityScore - a.popularityScore);
    }
  }

  return results;
}
