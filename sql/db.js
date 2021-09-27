const spicedPg = require("spiced-pg");
const { dbUserName, dbPassword } = require("../secrets");

const database = "mustard-imageboard";

const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.exportImages = () => {
    return db.query(`SELECT url, username, title, description FROM images`);
};
