module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "deletedAt", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "status", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "passwordHash", {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "jwt", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "deletedAt");
    await queryInterface.removeColumn("Users", "role");
    await queryInterface.removeColumn("Users", "status");
    await queryInterface.removeColumn("Users", "passwordHash");
    await queryInterface.removeColumn("Users", "jwt");
    await queryInterface.removeColumn("Users", "username");
  },
};
