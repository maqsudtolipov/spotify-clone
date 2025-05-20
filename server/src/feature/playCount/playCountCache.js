class PlayCountCache {
  constructor() {
    this.cache = {};
  }

  getPlayCount(songId) {
    if (!songId) return null;

    return this.cache[songId];
  }

  // Update count
  increaseCount(songId) {
    if (this.cache[songId]) {
      this.cache[songId].count += 1;
    } else {
      this.cache[songId] = {
        count: 1,
        createdAt: Date.now(),
      };
    }

    return this.cache[songId];
  }

  // Reset cache
  resetCount(songId) {
    if (this.cache[songId]) {
      delete this.cache[songId];
    }
  }
}

const playCountCache = new PlayCountCache();

module.exports = playCountCache;
