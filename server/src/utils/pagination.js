export const getPagination = (query = {}) => {
  let page = Number(query.page) || 1;
  let limit = Number(query.limit) || 20;

  page = Math.max(page, 1);
  limit = Math.max(limit, 1);

  if (limit > 100) {
    limit = 100;
  }

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const buildPaginationResponse = ({ data, total, page, limit }) => {
  return {
    data,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
};
