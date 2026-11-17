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
  Racing: ['#F59E0B', '#D97706'],
  Stealth: ['#475569', '#334155'],
  FPS: ['#06B6D4', '#0891B2'],
  Tactical: ['#10B981', '#047857'],
  Fighting: ['#E11D48', '#BE123C'],
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
  <text x="200" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-size="70" font-weight="bold" fill="rgba(255,255,255,0.9)" filter="url(#glow-${id})">${initials}</text>
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
      const p = paths[idx++];
      imgElement.src = p;
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
    title: 'Grand Theft Auto VI (GTA VI)',
    genre: ['Open World', 'Action', 'Adventure'],
    platform: ['PlayStation 5', 'Xbox Series X/S', 'PC'],
    releaseYear: 2025,
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    rating: 9.9,
    popularityScore: 100,
    peakPlayers: 2850000,
    description: 'Return to the neon-lit, palm-fringed streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Follow dual protagonists Lucia and Jason in a high-stakes crime drama across the sprawling state of Leonida.',
    coverImage: '/images/gtavi.jpg',
    trailerUrl: 'https://www.youtube.com/embed/QdBZY2fkU-0',
    tags: ['Open World', 'Crime', 'Multiplayer', 'Atmospheric', 'Action'],
    multiplayer: true,
    metacriticScore: 98,
  },
  {
    gameId: 'game-02',
    title: 'Uncharted: The Lost Legacy',
    genre: ['Action', 'Adventure'],
    platform: ['PlayStation 4', 'PlayStation 5', 'PC'],
    releaseYear: 2017,
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    rating: 8.9,
    popularityScore: 88,
    peakPlayers: 184500,
    description: "To recover an ancient artifact and keep it out of the hands of a ruthless warmonger, Chloe Frazer must enlist the aid of renowned mercenary Nadine Ross and venture to India's Western Ghats to locate the legendary Golden Tusk of Ganesh.",
    coverImage: '/images/uncharted-lost-legacy.jpg',
    trailerUrl: 'https://www.youtube.com/embed/i8q61wfZ19Q',
    tags: ['Treasure Hunting', 'Puzzle', 'Story Rich', 'Female Protagonist', 'Cinematic'],
    multiplayer: false,
    metacriticScore: 84,
  },
  {
    gameId: 'game-03',
    title: 'Cyberpunk 2077',
    genre: ['RPG', 'Action', 'Open World'],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    releaseYear: 2020,
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    rating: 9.1,
    popularityScore: 94,
    peakPlayers: 1054388,
    description: 'An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as V, a cyberpunk mercenary caught in a do-or-die fight for survival after a heist goes wrong alongside rockerboy Johnny Silverhand.',
    coverImage: '/images/cyberpunk2077.jpg',
    trailerUrl: 'https://www.youtube.com/embed/8X2kIfS6fb8',
    tags: ['Cyberpunk', 'Futuristic', 'Story Rich', 'Open World', 'Sci-Fi'],
    multiplayer: false,
    metacriticScore: 86,
  },
  {
    gameId: 'game-04',
    title: 'Red Dead Redemption 2 (RDR2)',
    genre: ['Open World', 'Action', 'Adventure'],
    platform: ['PC', 'PlayStation 4', 'Xbox One'],
    releaseYear: 2018,
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    rating: 9.8,
    popularityScore: 98,
    peakPlayers: 785400,
    description: 'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and bounty hunters massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America.',
    coverImage: '/images/rdr2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/eaW0tYpxyp0',
    tags: ['Western', 'Masterpiece', 'Story Rich', 'Open World', 'Realistic'],
    multiplayer: true,
    metacriticScore: 97,
  },
  {
    gameId: 'game-05',
    title: 'Black Myth: Wukong',
    genre: ['RPG', 'Action', 'Souls-like'],
    platform: ['PC', 'PlayStation 5'],
    releaseYear: 2024,
    developer: 'Game Science',
    publisher: 'Game Science',
    rating: 9.4,
    popularityScore: 96,
    peakPlayers: 2415714,
    description: 'An action RPG rooted in Chinese mythology. You set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from Journey to the West.',
    coverImage: '/images/black-myth-wukong.jpg',
    trailerUrl: 'https://www.youtube.com/embed/o0Q_h1Lp5-8',
    tags: ['Mythology', 'Martial Arts', 'Boss Rush', 'Souls-like', 'Action RPG'],
    multiplayer: false,
    metacriticScore: 81,
  },
  {
    gameId: 'game-06',
    title: 'God of War (2018)',
    genre: ['Action', 'Adventure', 'Hack and Slash'],
    platform: ['PlayStation 4', 'PC'],
    releaseYear: 2018,
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.7,
    popularityScore: 95,
    peakPlayers: 733230,
    description: 'Living as a man outside the shadow of the gods, Kratos ventures into the brutal Norse wilds with his son Atreus, fighting to fulfill a deeply personal quest atop the highest peak in the realms.',
    coverImage: '/images/godofwar.jpg',
    trailerUrl: 'https://www.youtube.com/embed/K0u_kAWLJOA',
    tags: ['Norse Mythology', 'Father and Son', 'Visceral Combat', 'Story Rich'],
    multiplayer: false,
    metacriticScore: 94,
  },
  {
    gameId: 'game-07',
    title: '007 First Light',
    genre: ['Action', 'Adventure', 'Stealth'],
    platform: ['PlayStation 5', 'Xbox Series X/S', 'PC'],
    releaseYear: 2025,
    developer: 'IO Interactive',
    publisher: 'IO Interactive',
    rating: 9.2,
    popularityScore: 91,
    peakPlayers: 320000,
    description: "Featuring a wholly original James Bond origin story, step into the shoes of the world's most famous secret agent as he earns his 00 status in a globe-trotting spy thriller filled with stealth and espionage.",
    coverImage: '/images/007-first-light.jpg',
    trailerUrl: 'https://www.youtube.com/embed/8q_i-Z1c-3A',
    tags: ['Espionage', 'Stealth', 'Secret Agent', 'Cinematic', 'Cover Shooter'],
    multiplayer: false,
    metacriticScore: 89,
  },
  {
    gameId: 'game-08',
    title: 'Ghost of Tsushima',
    genre: ['Open World', 'Action', 'Adventure'],
    platform: ['PlayStation 4', 'PlayStation 5', 'PC'],
    releaseYear: 2020,
    developer: 'Sucker Punch Productions',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.5,
    popularityScore: 95,
    peakPlayers: 540000,
    description: 'In the late 13th century, the Mongol empire has laid waste to entire nations. Samurai warrior Jin Sakai must move beyond his traditions to forge a new way of fighting—the way of the Ghost—to free Tsushima.',
    coverImage: '/images/ghost-of-tsushima.jpg',
    trailerUrl: 'https://www.youtube.com/embed/bkyP_KrhjXQ',
    tags: ['Samurai', 'Feudal Japan', 'Swordplay', 'Atmospheric', 'Open World'],
    multiplayer: true,
    metacriticScore: 83,
  },
  {
    gameId: 'game-09',
    title: 'Assassin’s Creed Shadows',
    genre: ['Open World', 'Action', 'Adventure', 'Stealth'],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    releaseYear: 2024,
    developer: 'Ubisoft Quebec',
    publisher: 'Ubisoft',
    rating: 9.0,
    popularityScore: 89,
    peakPlayers: 410000,
    description: 'Experience the intertwined stories of Naoe, an adept shinobi Assassin from Iga Province, and Yasuke, the powerful African samurai of historical legend, across late Sengoku-era feudal Japan.',
    coverImage: '/images/ac-shadows.jpg',
    trailerUrl: 'https://www.youtube.com/embed/vovkzbtYBC8',
    tags: ['Shinobi', 'Samurai', 'Feudal Japan', 'Stealth', 'Parkour'],
    multiplayer: false,
    metacriticScore: 85,
  },
  {
    gameId: 'game-10',
    title: 'Forza Horizon 6',
    genre: ['Racing', 'Open World', 'Simulation'],
    platform: ['Xbox Series X/S', 'PC'],
    releaseYear: 2025,
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    rating: 9.3,
    popularityScore: 92,
    peakPlayers: 650000,
    description: 'The premier open-world festival racer heads to new breathtaking biomes with hyper-realistic dynamic seasons, over 700 licensed supercars, and unmatched automotive freedom.',
    coverImage: '/images/forza-horizon-6.jpg',
    trailerUrl: 'https://www.youtube.com/embed/FYH9n37B7Yw',
    tags: ['Supercars', 'Open World Driving', 'Racing Festival', 'Physics', 'Customization'],
    multiplayer: true,
    metacriticScore: 91,
  },
  {
    gameId: 'game-11',
    title: 'Marvel’s Spider-Man Remastered',
    genre: ['Action', 'Adventure', 'Open World'],
    platform: ['PlayStation 5', 'PC'],
    releaseYear: 2022,
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.4,
    popularityScore: 94,
    peakPlayers: 480000,
    description: "Play as an experienced Peter Parker, fighting big crime and iconic villains in Marvel's New York. Web-swing through vibrant neighborhoods and defeat villains with acrobatic takedowns.",
    coverImage: '/images/spiderman.jpg',
    trailerUrl: 'https://www.youtube.com/embed/mrhr_jI1j54',
    tags: ['Superhero', 'Web Swinging', 'Open World', 'Fast-Paced', 'Marvel'],
    multiplayer: false,
    metacriticScore: 87,
  },
  {
    gameId: 'game-12',
    title: 'The Last of Us Part I',
    genre: ['Action', 'Adventure', 'Survival'],
    platform: ['PlayStation 5', 'PC'],
    releaseYear: 2022,
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    rating: 9.6,
    popularityScore: 96,
    peakPlayers: 520000,
    description: 'In a ravaged civilization where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone across post-apocalyptic America.',
    coverImage: '/images/tlou-part1.jpg',
    trailerUrl: 'https://www.youtube.com/embed/WxjeV19pfl8',
    tags: ['Post-Apocalyptic', 'Zombies', 'Emotional', 'Masterpiece', 'Survival Horror'],
    multiplayer: false,
    metacriticScore: 88,
  },
  {
    gameId: 'game-13',
    title: 'Need for Speed: Most Wanted',
    genre: ['Racing', 'Action', 'Open World'],
    platform: ['PC', 'PlayStation 2', 'Xbox 360', 'GameCube'],
    releaseYear: 2005,
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    rating: 9.6,
    popularityScore: 95,
    peakPlayers: 380000,
    description: 'Climb the notorious Blacklist 15 in Rockport City, evading aggressive police heat and reclaiming your stolen BMW M3 GTR in the most legendary street racing game of all time.',
    coverImage: '/images/nfs-most-wanted.jpg',
    trailerUrl: 'https://www.youtube.com/embed/i02Vb_G4k54',
    tags: ['Street Racing', 'Police Pursuit', 'Tuning', 'Classic', 'BMW M3 GTR'],
    multiplayer: true,
    metacriticScore: 83,
  },
  {
    gameId: 'game-14',
    title: 'Grand Theft Auto: Vice City',
    genre: ['Open World', 'Action', 'Adventure'],
    platform: ['PC', 'PlayStation 2', 'Xbox'],
    releaseYear: 2002,
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    rating: 9.5,
    popularityScore: 96,
    peakPlayers: 420000,
    description: "Welcome to the 1980s. From the decade of big hair and pastel suits comes the story of Tommy Vercetti's rise to the top of the criminal pile in glamorous Vice City.",
    coverImage: '/images/gta-vice-city.jpg',
    trailerUrl: 'https://www.youtube.com/embed/H73f7VvjV5E',
    tags: ['80s Retro', 'Synthwave', 'Crime Empire', 'Soundtrack', 'Classic'],
    multiplayer: false,
    metacriticScore: 95,
  },
  {
    gameId: 'game-15',
    title: 'Assassin’s Creed Mirage',
    genre: ['Action', 'Adventure', 'Stealth'],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    releaseYear: 2023,
    developer: 'Ubisoft Bordeaux',
    publisher: 'Ubisoft',
    rating: 8.8,
    popularityScore: 86,
    peakPlayers: 290000,
    description: 'Experience the story of Basim, a cunning street thief seeking answers and justice as he navigates the bustling streets of 9th-century Baghdad and becomes a Master Assassin.',
    coverImage: '/images/ac-mirage.jpg',
    trailerUrl: 'https://www.youtube.com/embed/k-5nVGJv7_E',
    tags: ['Baghdad', 'Assassins', 'Parkour', 'Stealth Takedowns', 'Historical'],
    multiplayer: false,
    metacriticScore: 77,
  },
  {
    gameId: 'game-16',
    title: 'Resident Evil Requiem',
    genre: ['Survival', 'Action', 'Adventure'],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    releaseYear: 2025,
    developer: 'Capcom',
    publisher: 'Capcom',
    rating: 9.3,
    popularityScore: 90,
    peakPlayers: 450000,
    description: 'A terrifying next chapter in the survival horror franchise. Face mutated bio-organic nightmares through atmospheric quarantined zones with resource-management and visceral combat.',
    coverImage: '/images/resident-evil-requiem.jpg',
    trailerUrl: 'https://www.youtube.com/embed/F4q_E29iPqY',
    tags: ['Survival Horror', 'Bio-hazard', 'Atmospheric', 'Zombies', 'Inventory Management'],
    multiplayer: false,
    metacriticScore: 90,
  },
  {
    gameId: 'game-17',
    title: 'Counter-Strike 2',
    genre: ['Action', 'FPS', 'Tactical'],
    platform: ['PC'],
    releaseYear: 2023,
    developer: 'Valve',
    publisher: 'Valve',
    rating: 9.2,
    popularityScore: 99,
    peakPlayers: 1818773,
    description: 'The largest technical leap forward in Counter-Strike history. Built on Source 2 with dynamic volumetric smokes, tick-rate-independent gameplay, and overhauled maps.',
    coverImage: '/images/cs2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/nSE38xjMLqE',
    tags: ['Competitive FPS', 'Tactical Shooter', 'Esports', 'Multiplayer', 'Bomb Defusal'],
    multiplayer: true,
    metacriticScore: 82,
  },
  {
    gameId: 'game-18',
    title: 'Project IGI',
    genre: ['Action', 'FPS', 'Stealth', 'Tactical'],
    platform: ['PC'],
    releaseYear: 2000,
    developer: 'Innerloop Studios',
    publisher: 'Eidos Interactive',
    rating: 8.9,
    popularityScore: 85,
    peakPlayers: 140000,
    description: 'One of the pioneer tactical stealth shooters in gaming history. Play as David Llewelyn Jones, a former SAS operative infiltrating top-secret military installations.',
    coverImage: '/images/project-igi.jpg',
    trailerUrl: 'https://www.youtube.com/embed/p17t6X5b_54',
    tags: ['Tactical Shooter', 'Stealth Operative', 'Nostalgia', 'Classic FPS', 'Military'],
    multiplayer: false,
    metacriticScore: 78,
  },
  {
    gameId: 'game-19',
    title: 'Minecraft',
    genre: ['Sandbox', 'Survival', 'Adventure'],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Mobile'],
    releaseYear: 2011,
    developer: 'Mojang Studios',
    publisher: 'Xbox Game Studios',
    rating: 9.8,
    popularityScore: 100,
    peakPlayers: 14000000,
    description: 'The world-famous voxel sandbox game. Place blocks, mine resources, craft tools, build colossal structures, and survive monsters in an infinite procedurally-generated world.',
    coverImage: '/images/minecraft.jpg',
    trailerUrl: 'https://www.youtube.com/embed/MmB9b5njVbA',
    tags: ['Building', 'Crafting', 'Creativity', 'Voxel', 'Co-op'],
    multiplayer: true,
    metacriticScore: 93,
  },
  {
    gameId: 'game-20',
    title: 'Tekken 3',
    genre: ['Action', 'Fighting'],
    platform: ['PlayStation', 'Arcade'],
    releaseYear: 1997,
    developer: 'Namco',
    publisher: 'Namco',
    rating: 9.7,
    popularityScore: 94,
    peakPlayers: 350000,
    description: 'Widely hailed as one of the greatest fighting games of all time. Introduced Jin Kazama, Ling Xiaoyu, and Eddy Gordo with lightning-fast 3D side-stepping combat.',
    coverImage: '/images/tekken-3.jpg',
    trailerUrl: 'https://www.youtube.com/embed/jZ_y-gV1yZ0',
    tags: ['Martial Arts', '3D Fighter', 'Arcade Classic', 'Legendary', 'Competitive'],
    multiplayer: true,
    metacriticScore: 96,
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
