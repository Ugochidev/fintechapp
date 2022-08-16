// // Update with your config settings.

// /**
// //  * @type { Object.<string, import("knex").Knex.Config> }
//  */
// module.exports = {
//   development: {
//     // const knex = require('knex')({
//     client: "mysql",
//     connection: {
//       host: "127.0.0.1",
//       port: 3306,
//       user: "your_database_user",
//       password: "your_database_password",
//       database: "myapp_test",
//     },
//     migrations: {
//       tableName: "migrations",
//     },
//   // });
//     // client: 'sqlite3',
//     // connection: {
//     //   filename: './dev.sqlite3'
//     // }
//   },

//     staging: {
//       client: 'postgresql',
//       connection: {
//         database: 'my_db',
//         user:     'username',
//         password: 'password'
//       },
//       pool: {
//         min: 2,
//         max: 10
//       },
//       migrations: {
//         tableName: 'knex_migrations'
//       }
//     },

//     production: {
//       client: 'postgresql',
//       connection: {
//         database: 'my_db',
//         user:     'username',
//         password: 'password'
//       },
//       pool: {
//         min: 2,
//         max: 10
//       },
//       migrations: {
//         tableName: 'knex_migrations'
//       }
//     },
// };
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 
 */

require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort,
    },
  },
  production: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort,
    },
  },
  testing: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort,
    },
  },
};

