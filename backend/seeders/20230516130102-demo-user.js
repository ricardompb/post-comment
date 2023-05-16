'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs')
    const salt = bcrypt.genSaltSync(10)
    return queryInterface.bulkInsert('users', [{
      login: 'ricardo',
      senha: bcrypt.hashSync('1234', salt),
      dataNascimento: new Date(1981, 12, 25),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
