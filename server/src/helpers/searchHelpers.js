exports.getPaginationResults = async (Model, filter, limit, page) => {
  limit = Math.min(parseInt(limit) || 10, 50);
  page = Math.min(parseInt(page) || 1, 50);

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
