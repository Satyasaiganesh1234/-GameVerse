/**
 * GameVerse — Hybrid Data Layer (db-client.js)
 * Calls Vercel /api/* MongoDB endpoints with automatic fallback to
 * IndexedDB + localStorage when the API is unreachable.
 */

/* ─── Session Management ─────────────────────────────────────────── */
function getSessionId() {
  let sid = localStorage.getItem('gv_session_id');
  if (!sid) {
    sid = 'gv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('gv_session_id', sid);
  }
  return sid;
}

/* ─── API Detection & Configuration ──────────────────────────────── */
let _apiAvailable = null;
const API_BASE = '';

async function isApiAvailable() {
  if (_apiAvailable !== null) return _apiAvailable;
  try {
    const res = await fetch(`${API_BASE}/api/games?id=game-01`, {
      signal: AbortSignal.timeout(3000),
    });
    _apiAvailable = res.ok;
  } catch {
    _apiAvailable = false;
  }
  console.log(`[GameVerse] API mode: ${_apiAvailable ? 'MongoDB' : 'Local Fallback (IndexedDB + localStorage)'}`);
  return _apiAvailable;
}

/* ─── IndexedDB Fallback ─────────────────────────────────────────── */
const IDB_NAME = 'GameVerseDB';
const IDB_VERSION = 1;

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('favorites')) {
        const favStore = db.createObjectStore('favorites', { keyPath: 'gameId' });
        favStore.createIndex('addedAt', 'addedAt', { unique: false });
      }
      if (!db.objectStoreNames.contains('compare')) {
        db.createObjectStore('compare', { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/* ─── Games API ──────────────────────────────────────────────────── */
const GameVerseDB = {
  /* ── Games ─────────────────────────────────────────── */
  async getGames(params = {}) {
    if (await isApiAvailable()) {
      try {
        const qs = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, v); });
        const res = await fetch(`${API_BASE}/api/games?${qs}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[GameVerse] API error, falling back:', e);
      }
    }
    // Fallback to catalog-data.js
    return filterGames(params);
  },

  async getGameById(id) {
    if (await isApiAvailable()) {
      try {
        const res = await fetch(`${API_BASE}/api/games?id=${id}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[GameVerse] API error, falling back:', e);
      }
    }
    return getGameById(id);
  },

  /* ── Favorites ─────────────────────────────────────── */
  async getFavorites() {
    const sid = getSessionId();
    if (await isApiAvailable()) {
      try {
        const res = await fetch(`${API_BASE}/api/favorites?sessionId=${sid}`);
        if (res.ok) {
          const favs = await res.json();
          return favs.map((f) => f.gameId);
        }
      } catch (e) {
        console.warn('[GameVerse] Favorites API error, falling back:', e);
      }
    }
    // IndexedDB fallback
    try {
      const db = await openIDB();
      return new Promise((resolve) => {
        const tx = db.transaction('favorites', 'readonly');
        const store = tx.objectStore('favorites');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result.map((f) => f.gameId));
        req.onerror = () => resolve(JSON.parse(localStorage.getItem('gv_favorites') || '[]'));
      });
    } catch {
      return JSON.parse(localStorage.getItem('gv_favorites') || '[]');
    }
  },

  async addFavorite(gameId) {
    const sid = getSessionId();
    if (await isApiAvailable()) {
      try {
        await fetch(`${API_BASE}/api/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid, gameId }),
        });
        return true;
      } catch (e) {
        console.warn('[GameVerse] Add favorite API error, falling back:', e);
      }
    }
    // IndexedDB fallback
    try {
      const db = await openIDB();
      return new Promise((resolve) => {
        const tx = db.transaction('favorites', 'readwrite');
        const store = tx.objectStore('favorites');
        store.put({ gameId, addedAt: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => {
          // localStorage fallback
          const favs = JSON.parse(localStorage.getItem('gv_favorites') || '[]');
          if (!favs.includes(gameId)) favs.push(gameId);
          localStorage.setItem('gv_favorites', JSON.stringify(favs));
          resolve(true);
        };
      });
    } catch {
      const favs = JSON.parse(localStorage.getItem('gv_favorites') || '[]');
      if (!favs.includes(gameId)) favs.push(gameId);
      localStorage.setItem('gv_favorites', JSON.stringify(favs));
      return true;
    }
  },

  async removeFavorite(gameId) {
    const sid = getSessionId();
    if (await isApiAvailable()) {
      try {
        await fetch(`${API_BASE}/api/favorites`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid, gameId }),
        });
        return true;
      } catch (e) {
        console.warn('[GameVerse] Remove favorite API error, falling back:', e);
      }
    }
    try {
      const db = await openIDB();
      return new Promise((resolve) => {
        const tx = db.transaction('favorites', 'readwrite');
        tx.objectStore('favorites').delete(gameId);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => {
          let favs = JSON.parse(localStorage.getItem('gv_favorites') || '[]');
          favs = favs.filter((id) => id !== gameId);
          localStorage.setItem('gv_favorites', JSON.stringify(favs));
          resolve(true);
        };
      });
    } catch {
      let favs = JSON.parse(localStorage.getItem('gv_favorites') || '[]');
      favs = favs.filter((id) => id !== gameId);
      localStorage.setItem('gv_favorites', JSON.stringify(favs));
      return true;
    }
  },

  async isFavorite(gameId) {
    const favs = await this.getFavorites();
    return favs.includes(gameId);
  },

  async toggleFavorite(gameId) {
    const isFav = await this.isFavorite(gameId);
    if (isFav) {
      await this.removeFavorite(gameId);
      return false;
    } else {
      await this.addFavorite(gameId);
      return true;
    }
  },

  /* ── Comparison Queue ──────────────────────────────── */
  async getCompareList() {
    const sid = getSessionId();
    if (await isApiAvailable()) {
      try {
        const res = await fetch(`${API_BASE}/api/compare?sessionId=${sid}`);
        if (res.ok) {
          const data = await res.json();
          return data.gameIds || [];
        }
      } catch (e) {
        console.warn('[GameVerse] Compare API error, falling back:', e);
      }
    }
    return JSON.parse(localStorage.getItem('gv_compare') || '[]');
  },

  async setCompareList(gameIds) {
    const sid = getSessionId();
    if (await isApiAvailable()) {
      try {
        await fetch(`${API_BASE}/api/compare`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid, gameIds }),
        });
        return true;
      } catch (e) {
        console.warn('[GameVerse] Set compare API error, falling back:', e);
      }
    }
    localStorage.setItem('gv_compare', JSON.stringify(gameIds));
    return true;
  },

  async addToCompare(gameId) {
    const list = await this.getCompareList();
    if (list.includes(gameId)) return { added: false, reason: 'Already in comparison' };
    if (list.length >= 5) return { added: false, reason: 'Maximum 5 games can be compared' };
    list.push(gameId);
    await this.setCompareList(list);
    return { added: true };
  },

  async removeFromCompare(gameId) {
    let list = await this.getCompareList();
    list = list.filter((id) => id !== gameId);
    await this.setCompareList(list);
    return true;
  },

  async clearCompare() {
    await this.setCompareList([]);
    return true;
  },

  /* ── Seed Database ─────────────────────────────────── */
  async seedDatabase() {
    if (await isApiAvailable()) {
      try {
        const res = await fetch(`${API_BASE}/api/seed`, { method: 'POST' });
        return await res.json();
      } catch (e) {
        return { success: false, error: e.message };
      }
    }
    return { success: true, message: 'Running in local mode — no seeding needed', seeded: false };
  },

  /* ── Data Source Info ───────────────────────────────── */
  async getDataSource() {
    const api = await isApiAvailable();
    return {
      mode: api ? 'mongodb' : 'local',
      label: api ? 'MongoDB Atlas' : 'IndexedDB + localStorage',
    };
  },
};
