const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/boilermaker', {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});

module.exports = db;