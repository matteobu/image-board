const spicedPg = require("spiced-pg");
const { dbUserName, dbPassword } = require("../secrets");

const database = "mustard-imageboard";

const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.exportImages = () => {
    return db.query(
        `SELECT url, username, title, description, created_at FROM images ORDER BY id DESC`
    );
};

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
