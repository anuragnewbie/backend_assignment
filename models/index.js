require("dotenv").config();
const dbConfig = require("../db/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// creating a new sequelize object
const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// testing the connection to the mysql database
sequelize.authenticate()
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch((error) => console.log(error));

const db = {};

// storing sequelize configuration details to this db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// storing all models to this db object
db.roles = require("./roleModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);

// defining association rules
db.users.belongsTo(db.roles);
db.roles.hasMany(db.users);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("All changes to the database has been synced");
    })
    .catch((error) => console.log(error));

module.exports = db;
