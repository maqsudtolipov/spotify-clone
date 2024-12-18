const ensureAuthenticated = async (req, res, next) => {
  try {
    console.log("Hit EA");

    next();
  } catch (e) {
    next(e);
  }
};
