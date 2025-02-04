const filterLibraryItems = (items) =>
  items.map((item) => ({
    id: item.refId._id,
    name: item.refId.name,
    user: item.itemType === "playlist" ? item.refId.user.name : undefined,
    img: item.refId.img.url,
    isPinned: item.isPinned,
    itemType: item.itemType,
    createdAt: item.refId.createdAt,
  }));

module.exports = filterLibraryItems;