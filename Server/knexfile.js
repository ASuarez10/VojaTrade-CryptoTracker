const credentials = require("./config/db_config.js");

module.exports = {
  development: {
    client: "postgres",
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password,
    },
  },
};
