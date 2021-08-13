const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query }
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach((param) => delete reqQuery[param])

  //Filtering
  const queryStr = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, (par) => `$${par}`)

  let query = model.find(JSON.parse(queryStr))
  //Selection
  if (req.query.select) query = query.select(req.query.select.split(',').join(' '))
  //Sorting
  if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '))
  else query = query.sort('-createdAt')

  //Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()
  const pagination = {}
  if (endIndex < total) pagination.next = { page: page + 1, limit }
  if (startIndex > 0) pagination.prev = { page: page - 1, limit }

  query = query.skip(startIndex).limit(limit)

  if (populate) query = query.populate(populate)

  const results = await query

  res.advancedResults = { success: true, pagination, count: results.length, data: results }
  next()
}

module.exports = advancedResults
