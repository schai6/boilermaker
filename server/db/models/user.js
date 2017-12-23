const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../_db');
const _ = require('lodash');

const User = db.define('user', {
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

// instance methods
User.prototype.hasMatchingPassword = function (candidatePassword) {
  // should return true or false for if the entered password matches
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 8, function (err, hash) {
        if (err) return reject(err);
        user.password = hash;
        return resolve(user);
      });
      return null;
    });
  }
}

module.exports = User;
