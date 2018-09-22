"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable("Images", {
    //   id: {
    //     type: Sequelize.INTEGER(11),
    //     primaryKey: true,
    //     autoIncrement: true
    //   },
    //   user_id: {
    //     type: Sequelize.INTEGER(11),
    //     allow_null: false,
    //     references: {
    //       model: "Users",
    //       key: "id"
    //     }
    //   },
    //   event_id: {
    //     type: Sequelize.INTEGER(11),
    //     allow_null: false,
    //     references: {
    //       model: "Events",
    //       key: "id"
    //     }
    //   },
    //   image: {
    //     type: Sequelize.STRING
    //   }
    // });

    const moments = await queryInterface.sequelize.query(`
      select * from events where event_type = "moment";
    `);

    moments[0].forEach(m => {
      queryInterface.sequelize.query(
        `
        insert into Images(user_id, event_id, image, created_at, updated_at) values(:user_id, :event_id, :image, :created_at, :updated_at);
      `,
        {
          replacements: {
            user_id: m.user_id,
            event_id: m.id,
            image: m.image,
            created_at: m.created_at,
            updated_at: m.updated_at
          }
        }
      );

      console.log(`Added ${m.image} to Image table for Event:${m.id}`);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
