/**
 * GameVerse — Page Controllers, Multi-Genre Engine, Chart.js Analytics, Trailer Modal
 * app.js — Main application logic for all pages.
 */

/* ─── Toast Notification System ──────────────────────────────────── */
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, duration);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  document.body.appendChild(c);
  return c;
}

/* ─── Trailer Modal ──────────────────────────────────────────────── */
function openTrailerModal(url, title) {
  let modal = document.getElementById('trailer-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'trailer-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="closeTrailerModal()" aria-label="Close">&times;</button>
        <h3 class="modal-title"></h3>
        <div class="modal-video-wrap">
          <iframe id="trailer-iframe" allowfullscreen allow="autoplay; encrypted-media" frameborder="0"></iframe>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeTrailerModal(); });
  }
  modal.querySelector('.modal-title').textContent = title || 'Trailer';
  document.getElementById('trailer-iframe').src = url + '?autoplay=1';
  modal.classList.add('modal-active');
  document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
  const modal = document.getElementById('trailer-modal');
  if (modal) {
    modal.classList.remove('modal-active');
    document.getElementById('trailer-iframe').src = '';
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeTrailerModal(); });

/* ─── Scroll-to-Top Button ───────────────────────────────────────── */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── Game Card Renderer ─────────────────────────────────────────── */
function createGameCard(game, options = {}) {
  const { showCompare = true, showFavorite = true, compact = false } = options;
  const card = document.createElement('div');
  card.className = `game-card ${compact ? 'game-card-compact' : ''} fade-in`;
  card.dataset.gameId = game.gameId;

  const ratingClass = game.rating >= 9 ? 'rating-high' : game.rating >= 8 ? 'rating-mid' : 'rating-low';
  const platformIcons = game.platform.slice(0, 3).map((p) => `<span class="platform-badge">${p}</span>`).join('');

  card.innerHTML = `
    <div class="card-image-wrap">
      <img class="card-image" alt="${game.title}" loading="lazy">
      <div class="card-overlay">
        <a href="game-details.html?id=${game.gameId}" class="btn btn-sm btn-primary">View Details</a>
        ${game.trailerUrl ? `<button class="btn btn-sm btn-accent" onclick="event.preventDefault();event.stopPropagation();openTrailerModal('${game.trailerUrl}','${game.title.replace(/'/g, "\\'")}')">▶ Trailer</button>` : ''}
      </div>
      <span class="card-rating ${ratingClass}">★ ${game.rating}</span>
      ${game.multiplayer ? '<span class="card-mp-badge">Multiplayer</span>' : ''}
    </div>
    <div class="card-body">
      <h3 class="card-title"><a href="game-details.html?id=${game.gameId}">${game.title}</a></h3>
      <p class="card-genre">${game.genre.join(' • ')}</p>
      <div class="card-meta">
        <span>${game.releaseYear}</span>
        <span>${game.developer}</span>
      </div>
      <div class="card-platforms">${platformIcons}</div>
      <div class="card-actions">
        ${showFavorite ? `<button class="btn-icon fav-btn" data-game-id="${game.gameId}" onclick="handleToggleFavorite('${game.gameId}', this)" aria-label="Toggle Favorite">♡</button>` : ''}
        ${showCompare ? `<button class="btn-icon compare-btn" data-game-id="${game.gameId}" onclick="handleAddToCompare('${game.gameId}', this)" aria-label="Add to Compare">⚖️</button>` : ''}
      </div>
    </div>`;

  // Load image with fallback
  const img = card.querySelector('.card-image');
  if (typeof loadGameImage === 'function') {
    loadGameImage(img, game);
  } else {
    img.src = game.coverImage || '';
    img.onerror = () => {
      if (typeof generateSVGCover === 'function') img.src = generateSVGCover(game);
    };
  }

  return card;
}

/* ─── Favorites Actions ──────────────────────────────────────────── */
async function handleToggleFavorite(gameId, btn) {
  const isFav = await GameVerseDB.toggleFavorite(gameId);
  if (btn) {
    btn.textContent = isFav ? '♥' : '♡';
    btn.classList.toggle('active', isFav);
  }
  showToast(isFav ? 'Added to favorites!' : 'Removed from favorites.', isFav ? 'success' : 'info');
  document.querySelectorAll(`.fav-btn[data-game-id="${gameId}"]`).forEach((b) => {
    b.textContent = isFav ? '♥' : '♡';
    b.classList.toggle('active', isFav);
  });
  // Refresh favorites page if on it
  if (typeof renderFavoritesPage === 'function') renderFavoritesPage();
}

async function syncFavoriteButtons() {
  const favs = await GameVerseDB.getFavorites();
  document.querySelectorAll('.fav-btn').forEach((btn) => {
    const id = btn.dataset.gameId;
    const isFav = favs.includes(id);
    btn.textContent = isFav ? '♥' : '♡';
    btn.classList.toggle('active', isFav);
  });
}

/* ─── Compare Actions ────────────────────────────────────────────── */
async function handleAddToCompare(gameId, btn) {
  const result = await GameVerseDB.addToCompare(gameId);
  if (result.added) {
    showToast('Added to comparison!', 'success');
    if (btn) btn.classList.add('active');
    updateCompareCount();
  } else {
    showToast(result.reason, 'warning');
  }
}

async function updateCompareCount() {
  const list = await GameVerseDB.getCompareList();
  document.querySelectorAll('.compare-count').forEach((el) => {
    el.textContent = list.length;
    el.style.display = list.length > 0 ? 'inline-flex' : 'none';
  });
}

/* ─── Data Source Badge ──────────────────────────────────────────── */
async function showDataSourceBadge() {
  const info = await GameVerseDB.getDataSource();
  const badge = document.getElementById('data-source-badge');
  if (badge) {
    badge.textContent = `Data: ${info.label}`;
    badge.className = `data-badge data-badge-${info.mode}`;
  }
}

/* ─── HOME PAGE Controller ───────────────────────────────────────── */
async function initHomePage() {
  // Featured Games (top 6 by popularity)
  const featured = document.getElementById('featured-games');
  if (featured) {
    const games = await GameVerseDB.getGames({ sort: 'popularity-desc' });
    const top6 = (games || []).slice(0, 6);
    top6.forEach((g) => featured.appendChild(createGameCard(g)));
    await syncFavoriteButtons();
  }

  // Top Rated
  const topRated = document.getElementById('top-rated-games');
  if (topRated) {
    const games = await GameVerseDB.getGames({ sort: 'rating-desc' });
    const top4 = (games || []).slice(0, 4);
    top4.forEach((g) => topRated.appendChild(createGameCard(g, { compact: true })));
    await syncFavoriteButtons();
  }

  // Stats
  const allGames = await GameVerseDB.getGames({});
  const statsContainer = document.getElementById('quick-stats');
  if (statsContainer && allGames) {
    const totalPlayers = allGames.reduce((sum, g) => sum + g.peakPlayers, 0);
    const avgRating = (allGames.reduce((sum, g) => sum + g.rating, 0) / allGames.length).toFixed(1);
    const genres = new Set();
    allGames.forEach((g) => g.genre.forEach((gen) => genres.add(gen)));

    document.getElementById('stat-total-games') && (document.getElementById('stat-total-games').textContent = allGames.length);
    document.getElementById('stat-avg-rating') && (document.getElementById('stat-avg-rating').textContent = avgRating);
    document.getElementById('stat-total-players') && (document.getElementById('stat-total-players').textContent = (totalPlayers / 1e6).toFixed(1) + 'M');
    document.getElementById('stat-genres') && (document.getElementById('stat-genres').textContent = genres.size);
  }

  animateCounters();
}

/* ─── Counter Animation ──────────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseFloat(el.textContent);
    if (isNaN(target)) return;
    const suffix = el.textContent.replace(/[\d.]/g, '');
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
    }, 30);
  });
}

/* ─── EXPLORE PAGE Controller ────────────────────────────────────── */
async function initExplorePage() {
  const grid = document.getElementById('explore-grid');
  const searchInput = document.getElementById('explore-search');
  const genreFilter = document.getElementById('genre-filter');
  const platformFilter = document.getElementById('platform-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const sortSelect = document.getElementById('sort-select');
  const resultCount = document.getElementById('result-count');
  const viewToggle = document.querySelectorAll('.view-toggle-btn');

  if (!grid) return;

  // Populate filter dropdowns
  if (genreFilter) {
    const genres = typeof getAllGenres === 'function' ? getAllGenres() : [];
    genres.forEach((g) => {
      const opt = document.createElement('option');
      opt.value = g; opt.textContent = g;
      genreFilter.appendChild(opt);
    });
  }

  if (platformFilter) {
    const platforms = typeof getAllPlatforms === 'function' ? getAllPlatforms() : [];
    platforms.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p; opt.textContent = p;
      platformFilter.appendChild(opt);
    });
  }

  async function renderGames() {
    const params = {};
    if (searchInput && searchInput.value) params.search = searchInput.value;
    if (genreFilter && genreFilter.value) params.genre = genreFilter.value;
    if (platformFilter && platformFilter.value) params.platform = platformFilter.value;
    if (ratingFilter && ratingFilter.value) params.minRating = ratingFilter.value;
    if (sortSelect && sortSelect.value) params.sort = sortSelect.value;

    grid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading games...</p></div>';

    const games = await GameVerseDB.getGames(params);
    grid.innerHTML = '';

    if (!games || games.length === 0) {
      grid.innerHTML = '<div class="no-results"><p>🎮 No games found matching your filters.</p><p>Try adjusting your search criteria.</p></div>';
    } else {
      games.forEach((g) => grid.appendChild(createGameCard(g)));
    }

    if (resultCount) resultCount.textContent = `${(games || []).length} games found`;
    await syncFavoriteButtons();
  }

  // Event listeners
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(renderGames, 300);
    });
  }
  [genreFilter, platformFilter, ratingFilter, sortSelect].forEach((el) => {
    if (el) el.addEventListener('change', renderGames);
  });

  // View toggle (grid/list)
  viewToggle.forEach((btn) => {
    btn.addEventListener('click', () => {
      viewToggle.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      grid.className = btn.dataset.view === 'list' ? 'game-grid list-view' : 'game-grid';
    });
  });

  // Clear filters
  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (genreFilter) genreFilter.value = '';
      if (platformFilter) platformFilter.value = '';
      if (ratingFilter) ratingFilter.value = '';
      if (sortSelect) sortSelect.value = 'popularity-desc';
      renderGames();
    });
  }

  await renderGames();
}

/* ─── GAME DETAILS PAGE Controller ───────────────────────────────── */
async function initGameDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('id');
  const container = document.getElementById('game-details');

  if (!gameId || !container) {
    if (container) container.innerHTML = '<p class="error">Game not found. Please go back to <a href="explore.html">Explore</a>.</p>';
    return;
  }

  container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading game details...</p></div>';

  const game = await GameVerseDB.getGameById(gameId);
  if (!game) {
    container.innerHTML = '<p class="error">Game not found. Please go back to <a href="explore.html">Explore</a>.</p>';
    return;
  }

  document.title = `${game.title} — GameVerse`;

  const isFav = await GameVerseDB.isFavorite(game.gameId);
  const ratingClass = game.rating >= 9 ? 'rating-high' : game.rating >= 8 ? 'rating-mid' : 'rating-low';

  container.innerHTML = `
    <div class="detail-hero">
      <div class="detail-image-wrap">
        <img id="detail-cover" class="detail-cover" alt="${game.title}">
      </div>
      <div class="detail-info">
        <h1 class="detail-title">${game.title}</h1>
        <div class="detail-meta-row">
          <span class="detail-rating ${ratingClass}">★ ${game.rating}/10</span>
          <span class="detail-year">${game.releaseYear}</span>
          ${game.multiplayer ? '<span class="mp-tag">🌐 Multiplayer</span>' : '<span class="sp-tag">🎮 Singleplayer</span>'}
        </div>
        <div class="detail-genres">${game.genre.map((g) => `<span class="genre-tag">${g}</span>`).join('')}</div>
        <p class="detail-desc">${game.description}</p>
        <div class="detail-info-grid">
          <div class="info-item"><span class="info-label">Developer</span><span class="info-value">${game.developer}</span></div>
          <div class="info-item"><span class="info-label">Publisher</span><span class="info-value">${game.publisher}</span></div>
          <div class="info-item"><span class="info-label">Peak Players</span><span class="info-value">${game.peakPlayers.toLocaleString()}</span></div>
          <div class="info-item"><span class="info-label">Popularity</span><span class="info-value">${game.popularityScore}/100</span></div>
          ${game.metacriticScore ? `<div class="info-item"><span class="info-label">Metacritic</span><span class="info-value">${game.metacriticScore}/100</span></div>` : ''}
        </div>
        <div class="detail-platforms"><strong>Platforms:</strong> ${game.platform.map((p) => `<span class="platform-badge">${p}</span>`).join('')}</div>
        <div class="detail-tags"><strong>Tags:</strong> ${game.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('')}</div>
        <div class="detail-actions">
          <button class="btn btn-primary fav-btn ${isFav ? 'active' : ''}" data-game-id="${game.gameId}" onclick="handleToggleFavorite('${game.gameId}', this)">
            ${isFav ? '♥ Favorited' : '♡ Add to Favorites'}
          </button>
          <button class="btn btn-accent" onclick="handleAddToCompare('${game.gameId}', this)">⚖️ Add to Compare</button>
          ${game.trailerUrl ? `<button class="btn btn-secondary" onclick="openTrailerModal('${game.trailerUrl}', '${game.title.replace(/'/g, "\\'")}')">▶ Watch Trailer</button>` : ''}
        </div>
      </div>
    </div>
    <div class="detail-charts">
      <h2 class="section-title neon-text">📊 Game Analytics</h2>
      <div class="charts-grid">
        <div class="chart-card"><canvas id="chart-ratings"></canvas></div>
        <div class="chart-card"><canvas id="chart-popularity"></canvas></div>
      </div>
    </div>`;

  // Load cover image
  const coverImg = document.getElementById('detail-cover');
  if (typeof loadGameImage === 'function') loadGameImage(coverImg, game);
  else coverImg.src = game.coverImage || '';

  // Render charts
  if (typeof Chart !== 'undefined') {
    renderDetailCharts(game);
  }
}

function renderDetailCharts(game) {
  // Rating breakdown chart
  const rCtx = document.getElementById('chart-ratings');
  if (rCtx) {
    new Chart(rCtx, {
      type: 'doughnut',
      data: {
        labels: ['User Rating', 'Metacritic', 'Remaining'],
        datasets: [{
          data: [game.rating, (game.metacriticScore || 0) / 10, 10 - game.rating],
          backgroundColor: ['#8B5CF6', '#3B82F6', 'rgba(255,255,255,0.1)'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#E2E8F0', font: { size: 12 } } },
          title: { display: true, text: 'Rating Breakdown', color: '#E2E8F0' },
        },
      },
    });
  }

  // Popularity gauge chart
  const pCtx = document.getElementById('chart-popularity');
  if (pCtx) {
    new Chart(pCtx, {
      type: 'bar',
      data: {
        labels: ['Rating', 'Popularity', 'Metacritic'],
        datasets: [{
          label: game.title,
          data: [game.rating * 10, game.popularityScore, game.metacriticScore || 0],
          backgroundColor: ['rgba(139,92,246,0.8)', 'rgba(16,185,129,0.8)', 'rgba(59,130,246,0.8)'],
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { ticks: { color: '#94A3B8' }, grid: { display: false } },
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Score Overview (%)', color: '#E2E8F0' },
        },
      },
    });
  }
}

/* ─── COMPARE PAGE Controller ────────────────────────────────────── */
async function initComparePage() {
  const container = document.getElementById('compare-container');
  const addGameSelect = document.getElementById('add-game-select');
  if (!container) return;

  // Populate add-game dropdown
  if (addGameSelect) {
    const allGames = await GameVerseDB.getGames({});
    (allGames || []).forEach((g) => {
      const opt = document.createElement('option');
      opt.value = g.gameId;
      opt.textContent = g.title;
      addGameSelect.appendChild(opt);
    });

    addGameSelect.addEventListener('change', async () => {
      if (addGameSelect.value) {
        const result = await GameVerseDB.addToCompare(addGameSelect.value);
        if (result.added) {
          showToast('Added to comparison!', 'success');
          await renderComparePage();
        } else {
          showToast(result.reason, 'warning');
        }
        addGameSelect.value = '';
      }
    });
  }

  // Clear all button
  const clearBtn = document.getElementById('clear-compare');
  if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
      await GameVerseDB.clearCompare();
      showToast('Comparison cleared', 'info');
      await renderComparePage();
    });
  }

  await renderComparePage();
}

async function renderComparePage() {
  const container = document.getElementById('compare-container');
  const chartContainer = document.getElementById('compare-charts');
  if (!container) return;

  const gameIds = await GameVerseDB.getCompareList();
  updateCompareCount();

  if (gameIds.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>📊 No Games to Compare</h3>
        <p>Add games from the <a href="explore.html">Explore</a> page or use the dropdown above.</p>
      </div>`;
    if (chartContainer) chartContainer.innerHTML = '';
    return;
  }

  // Fetch game details
  const games = [];
  for (const id of gameIds) {
    const g = await GameVerseDB.getGameById(id);
    if (g) games.push(g);
  }

  // Build comparison table
  container.innerHTML = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Attribute</th>
            ${games.map((g) => `<th>
              <div class="compare-header">
                <img class="compare-thumb" alt="${g.title}" data-game-id="${g.gameId}">
                <span>${g.title}</span>
                <button class="btn-icon btn-remove" onclick="removeFromCompareAndRefresh('${g.gameId}')" title="Remove">&times;</button>
              </div>
            </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr><td>Rating</td>${games.map((g) => `<td><span class="compare-rating">★ ${g.rating}</span></td>`).join('')}</tr>
          <tr><td>Popularity</td>${games.map((g) => `<td>${g.popularityScore}/100</td>`).join('')}</tr>
          <tr><td>Peak Players</td>${games.map((g) => `<td>${g.peakPlayers.toLocaleString()}</td>`).join('')}</tr>
          <tr><td>Release Year</td>${games.map((g) => `<td>${g.releaseYear}</td>`).join('')}</tr>
          <tr><td>Developer</td>${games.map((g) => `<td>${g.developer}</td>`).join('')}</tr>
          <tr><td>Genre</td>${games.map((g) => `<td>${g.genre.join(', ')}</td>`).join('')}</tr>
          <tr><td>Platforms</td>${games.map((g) => `<td>${g.platform.join(', ')}</td>`).join('')}</tr>
          <tr><td>Multiplayer</td>${games.map((g) => `<td>${g.multiplayer ? '✅ Yes' : '❌ No'}</td>`).join('')}</tr>
          <tr><td>Metacritic</td>${games.map((g) => `<td>${g.metacriticScore || 'N/A'}</td>`).join('')}</tr>
        </tbody>
      </table>
    </div>`;

  // Load thumbnails
  container.querySelectorAll('.compare-thumb').forEach((img) => {
    const g = games.find((game) => game.gameId === img.dataset.gameId);
    if (g && typeof loadGameImage === 'function') loadGameImage(img, g);
  });

  // Render comparison charts
  if (chartContainer && typeof Chart !== 'undefined' && games.length >= 2) {
    chartContainer.innerHTML = `
      <h2 class="section-title neon-text">📈 Visual Comparison</h2>
      <div class="charts-grid">
        <div class="chart-card"><canvas id="compare-radar"></canvas></div>
        <div class="chart-card"><canvas id="compare-bar"></canvas></div>
      </div>`;
    renderCompareCharts(games);
  }
}

function renderCompareCharts(games) {
  const colors = ['rgba(139,92,246,0.7)', 'rgba(16,185,129,0.7)', 'rgba(245,158,11,0.7)', 'rgba(239,68,68,0.7)', 'rgba(59,130,246,0.7)'];
  const borderColors = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

  // Radar Chart
  const rCtx = document.getElementById('compare-radar');
  if (rCtx) {
    new Chart(rCtx, {
      type: 'radar',
      data: {
        labels: ['Rating', 'Popularity', 'Peak Players (scaled)', 'Metacritic', 'Year (scaled)'],
        datasets: games.map((g, i) => ({
          label: g.title,
          data: [
            g.rating * 10,
            g.popularityScore,
            Math.min((g.peakPlayers / 20000), 100),
            g.metacriticScore || 0,
            Math.min(((g.releaseYear - 2000) / 25) * 100, 100),
          ],
          backgroundColor: colors[i],
          borderColor: borderColors[i],
          borderWidth: 2,
          pointBackgroundColor: borderColors[i],
        })),
      },
      options: {
        responsive: true,
        scales: { r: { beginAtZero: true, max: 100, ticks: { color: '#94A3B8', backdropColor: 'transparent' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#E2E8F0' } } },
        plugins: { legend: { labels: { color: '#E2E8F0' } }, title: { display: true, text: 'Multi-Metric Radar', color: '#E2E8F0' } },
      },
    });
  }

  // Bar Chart
  const bCtx = document.getElementById('compare-bar');
  if (bCtx) {
    new Chart(bCtx, {
      type: 'bar',
      data: {
        labels: games.map((g) => g.title.length > 20 ? g.title.substring(0, 18) + '…' : g.title),
        datasets: [
          { label: 'Rating (×10)', data: games.map((g) => g.rating * 10), backgroundColor: 'rgba(139,92,246,0.8)', borderRadius: 6 },
          { label: 'Popularity', data: games.map((g) => g.popularityScore), backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: 6 },
          { label: 'Metacritic', data: games.map((g) => g.metacriticScore || 0), backgroundColor: 'rgba(59,130,246,0.8)', borderRadius: 6 },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { ticks: { color: '#94A3B8' }, grid: { display: false } },
        },
        plugins: {
          legend: { labels: { color: '#E2E8F0' } },
          title: { display: true, text: 'Side-by-Side Scores', color: '#E2E8F0' },
        },
      },
    });
  }
}

async function removeFromCompareAndRefresh(gameId) {
  await GameVerseDB.removeFromCompare(gameId);
  showToast('Removed from comparison', 'info');
  await renderComparePage();
}

/* ─── FAVORITES PAGE Controller ──────────────────────────────────── */
async function initFavoritesPage() {
  await renderFavoritesPage();
}

async function renderFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  const count = document.getElementById('favorites-count');
  if (!grid) return;

  const favIds = await GameVerseDB.getFavorites();

  if (favIds.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>💜 No Favorites Yet</h3>
        <p>Explore games and click the ♡ button to add them here!</p>
        <a href="explore.html" class="btn btn-primary">Browse Games</a>
      </div>`;
    if (count) count.textContent = '0';
    return;
  }

  if (count) count.textContent = favIds.length;

  grid.innerHTML = '';
  for (const id of favIds) {
    const game = await GameVerseDB.getGameById(id);
    if (game) {
      grid.appendChild(createGameCard(game, { showCompare: true }));
    }
  }
  await syncFavoriteButtons();
}

/* ─── MONGODB SHELL PAGE Controller ──────────────────────────────── */
async function initMongoDBPage() {
  const output = document.getElementById('shell-output');
  const input = document.getElementById('shell-input');
  const runBtn = document.getElementById('shell-run');
  const seedBtn = document.getElementById('seed-btn');
  const clearBtn = document.getElementById('shell-clear');

  if (!output) return;

  function appendOutput(text, type = 'result') {
    const line = document.createElement('div');
    line.className = `shell-line shell-${type}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  appendOutput('Welcome to GameVerse MongoDB Shell (Interactive Simulator)', 'info');
  appendOutput('Type commands like: db.games.find(), db.games.count(), db.favorites.find()', 'info');
  appendOutput('───────────────────────────────────────────', 'info');

  const dataSource = await GameVerseDB.getDataSource();
  appendOutput(`Connected to: ${dataSource.label} (${dataSource.mode} mode)`, 'info');

  // Shell command processor
  async function processCommand(cmd) {
    appendOutput(`> ${cmd}`, 'command');
    const trimmed = cmd.trim().toLowerCase();

    try {
      if (trimmed === 'help') {
        appendOutput('Available commands:', 'info');
        appendOutput('  db.games.find()           — List all games', 'info');
        appendOutput('  db.games.find({genre:"RPG"}) — Filter by genre', 'info');
        appendOutput('  db.games.count()          — Count all games', 'info');
        appendOutput('  db.games.findOne("game-01")  — Find one game', 'info');
        appendOutput('  db.favorites.find()       — List favorites', 'info');
        appendOutput('  db.compare.find()         — Show compare list', 'info');
        appendOutput('  db.stats()                — Database statistics', 'info');
        appendOutput('  clear                     — Clear output', 'info');
      } else if (trimmed === 'clear') {
        output.innerHTML = '';
      } else if (trimmed.includes('db.games.find()') || trimmed.includes('db.games.find({})')) {
        const games = await GameVerseDB.getGames({});
        appendOutput(JSON.stringify(games.map((g) => ({ gameId: g.gameId, title: g.title, rating: g.rating, genre: g.genre })), null, 2), 'result');
      } else if (trimmed.includes('db.games.count()')) {
        const games = await GameVerseDB.getGames({});
        appendOutput(`${games.length}`, 'result');
      } else if (trimmed.includes('db.games.findone') || trimmed.includes('db.games.find("game-')) {
        const match = cmd.match(/game-\d+/);
        if (match) {
          const game = await GameVerseDB.getGameById(match[0]);
          appendOutput(JSON.stringify(game, null, 2), 'result');
        } else {
          appendOutput('Usage: db.games.findOne("game-01")', 'error');
        }
      } else if (trimmed.includes('db.games.find({') || trimmed.includes('db.games.find({"genre"') || trimmed.includes("db.games.find({'genre'")) {
        const genreMatch = cmd.match(/genre['":\s]+['"]?(\w+)/i);
        if (genreMatch) {
          const games = await GameVerseDB.getGames({ genre: genreMatch[1] });
          appendOutput(JSON.stringify(games.map((g) => ({ gameId: g.gameId, title: g.title, genre: g.genre })), null, 2), 'result');
        } else {
          const games = await GameVerseDB.getGames({});
          appendOutput(JSON.stringify(games.map((g) => ({ gameId: g.gameId, title: g.title })), null, 2), 'result');
        }
      } else if (trimmed.includes('db.favorites')) {
        const favs = await GameVerseDB.getFavorites();
        appendOutput(JSON.stringify(favs, null, 2), 'result');
      } else if (trimmed.includes('db.compare')) {
        const list = await GameVerseDB.getCompareList();
        appendOutput(JSON.stringify(list, null, 2), 'result');
      } else if (trimmed.includes('db.stats()')) {
        const games = await GameVerseDB.getGames({});
        const favs = await GameVerseDB.getFavorites();
        const compare = await GameVerseDB.getCompareList();
        const ds = await GameVerseDB.getDataSource();
        appendOutput(JSON.stringify({
          dataSource: ds.label,
          collections: { games: games.length, favorites: favs.length, compareQueue: compare.length },
          avgRating: (games.reduce((s, g) => s + g.rating, 0) / games.length).toFixed(2),
          totalPeakPlayers: games.reduce((s, g) => s + g.peakPlayers, 0).toLocaleString(),
        }, null, 2), 'result');
      } else {
        appendOutput(`Command not recognized: ${cmd}. Type 'help' for available commands.`, 'error');
      }
    } catch (e) {
      appendOutput(`Error: ${e.message}`, 'error');
    }
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        processCommand(input.value.trim());
        input.value = '';
      }
    });
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        processCommand(input.value.trim());
        input.value = '';
      }
    });
  }

  if (seedBtn) {
    seedBtn.addEventListener('click', async () => {
      appendOutput('> Seeding database...', 'command');
      const result = await GameVerseDB.seedDatabase();
      appendOutput(JSON.stringify(result, null, 2), result.success ? 'result' : 'error');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => { output.innerHTML = ''; });
  }
}

/* ─── ABOUT PAGE Controller (minimal) ────────────────────────────── */
function initAboutPage() {
  // Collapsible sections
  document.querySelectorAll('.collapsible-header').forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');
      content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    });
  });
}

/* ─── Mobile Navigation ──────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('nav-open');
      toggle.classList.toggle('active');
    });
    // Close on link click
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('nav-open');
        toggle.classList.remove('active');
      });
    });
  }
}

/* ─── Active Nav Link ────────────────────────────────────────────── */
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

/* ─── Global Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  initMobileNav();
  setActiveNavLink();
  initScrollToTop();
  showDataSourceBadge();
  updateCompareCount();

  // Page-specific initializations
  const page = document.body.dataset.page;
  switch (page) {
    case 'home':       await initHomePage(); break;
    case 'explore':    await initExplorePage(); break;
    case 'details':    await initGameDetailsPage(); break;
    case 'compare':    await initComparePage(); break;
    case 'favorites':  await initFavoritesPage(); break;
    case 'mongodb':    await initMongoDBPage(); break;
    case 'about':      initAboutPage(); break;
  }
});
