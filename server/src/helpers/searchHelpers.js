const Song = require("../models/songModel");
exports.getPaginationResults = async (Model, filter, limit, page) => {
  limit = Math.max(parseInt(limit) || 10);
  page = Math.max(parseInt(page) || 1);

  const totalCount = await Model.countDocuments(filter); // Count of matching documents
  const totalPages = Math.ceil(totalCount / limit);
  const validPage = Math.min(page, totalPages || 1); // Prevent over-paging

  return {
    limit,
    totalCount,
    totalPages,
    validPage,
  };
};
