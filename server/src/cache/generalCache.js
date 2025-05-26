const cache = new Map();

exports.setCache = (key, value) => {
  cache.set(key, value);
};

exports.getCache = (key) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData;
  } else {
    return null;
  }
};
