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

const testCache = {
  songOne: {
    todaysPlays: 4453,
    date: "03-14-2025",
  },
};

// If song exists upate count
// else: create song with value 0

// If passed 24 hours, update database and reset cache
// else IDK

const playCountCache = new PlayCountCache();

// playCountCache.increaseCount("two");
// playCountCache.increaseCount("one");
// playCountCache.increaseCount("one");
// playCountCache.increaseCount("two");
// playCountCache.increaseCount("one");
// playCountCache.increaseCount("one");
// playCountCache.increaseCount("two");
//
// playCountCache.resetCount("two");
// // playCountCache.resetCount("one");
//
// console.log(playCountCache);

module.exports = playCountCache;
