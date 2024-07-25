"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Step 1: Add the new UUID column as nullable first
      await queryInterface.addColumn(
        "Users",
        "new_id",
        {
          type: Sequelize.UUID,
          allowNull: true, // Allow null initially
        },
        { transaction }
      );

      // Step 2: Generate and assign UUIDs to the new column for existing rows
      await queryInterface.sequelize.query(
        `
        UPDATE "Users"
        SET "new_id" = uuid_generate_v4()
        WHERE "new_id" IS NULL; -- Only update rows where new_id is null
      `,
        { transaction }
      );

      // Step 3: Drop the old integer column
      await queryInterface.removeColumn("Users", "id", { transaction });

      // Step 4: Rename the new UUID column to 'id'
      await queryInterface.renameColumn("Users", "new_id", "id", {
        transaction,
      });

      // Step 5: Ensure the new 'id' column is NOT NULL
      await queryInterface.changeColumn(
        "Users",
        "id",
        {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true, // Set as primary key if needed
        },
        { transaction }
      );

      // Commit the transaction if all steps are successful
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Check if 'id' column exists before proceeding
      const columnExists = await queryInterface.sequelize.query(
        `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'Users' AND column_name = 'id';
      `,
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (columnExists.length > 0) {
        // Step 1: Add the old integer column back
        await queryInterface.addColumn(
          "Users",
          "old_id",
          {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          { transaction }
        );

        // Step 2: Reassign integer IDs (if possible; may require custom logic)
        await queryInterface.sequelize.query(
          `
          UPDATE "Users"
          SET "old_id" = (SELECT nextval('users_id_seq'))
          WHERE "old_id" IS NULL; -- Only update rows where old_id is null
        `,
          { transaction }
        );

        // Step 3: Drop the UUID column
        await queryInterface.removeColumn("Users", "id", { transaction });

        // Step 4: Rename the old integer column back to 'id'
        await queryInterface.renameColumn("Users", "old_id", "id", {
          transaction,
        });
      }

      // Commit the transaction if all steps are successful
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  },
};
