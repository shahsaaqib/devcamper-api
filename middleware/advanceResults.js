const advanceResults = (model, populate) => async (req, res, next) => {
  let query;

  //create copy
  const reqQuery = { ...req.query };

  // Remove fields from Query
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete from query
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create Query sting
  let queryStr = JSON.stringify(reqQuery);

  // Create operators { $gt, $gte etc}
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding Resources
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const fields = req.query.sort.split(',').join(' ');
    query = query.sort(fields);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Adding virtuals
  if (populate) {
    query = query.populate(populate);
  }

  // Executing Query
  const results = await query;

  // Pagination Result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advanceResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advanceResults;
