const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isFulfilled: {
    type: Sequelize.ENUM('yes', 'no'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order