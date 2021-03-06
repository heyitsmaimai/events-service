module.exports = Model => (req, res, next) => {
  const qb = Model.query();
  if (req.query.orderBy) {
    qb.orderBy(req.query.orderBy, req.query.direction || 'asc');
  }
  if (req.query.fields) {
    qb.column(req.query.fields.split(','));
  }
  res.locals.qb = qb;
  next();
};
