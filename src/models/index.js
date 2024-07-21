module.exports = (sequelize, dataTypes) => {
  const User = require("./user.js")(sequelize, dataTypes);

  return { User };
};
