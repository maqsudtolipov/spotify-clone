const cache = new Map();

exports.setCache = (key, value) => {
  cache.set(key, value);
  console.log(`Cache set for key: ${key}`);
};

exports.getCache = (key) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData;
  } else {
    return null;
  }
};
