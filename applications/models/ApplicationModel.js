const { Model } = require('objection');

class ApplicationModel extends Model {
  static get STATUSES() {
    return {
      APPROVED: 'approved',
      PENDING: 'pending',
      CANCELLED: 'cancelled',
    };
  }
  static get preConditions() {
    return {
      active: ['deleted', '=', 0],
      inactive: ['deleted', '=', 1],
      approved: ['status', '=', this.STATUSES.APPROVED],
      pending: ['status', '=', this.STATUSES.PENDING],
      cancelled: ['status', '=', this.STATUSES.CANCELLED],
    };
  }
  static get namedFilters() {
    return {
      active: builder => builder.where(...this.preConditions.active),
      inactive: builder => builder.where(...this.preConditions.inactive),
      approved: builder => builder.where(...this.preConditions.approved),
      pending: builder => builder.where(...this.preConditions.pending),
      cancelled: builder => builder.where(...this.preConditions.cancelled),
      // Joined
      booked: builder => builder.applyFilter('approved')
        .applyFilter('active'),
      awaiting: builder => builder.applyFilter('active')
        .whereNot(...this.preConditions.cancelled),
    };
  }
  static get tableName() {
    return 'cd_applications';
  }
}

module.exports = ApplicationModel;
