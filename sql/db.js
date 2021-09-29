const spicedPg = require("spiced-pg");
const { dbUserName, dbPassword } = require("../secrets");

const database = "mustard-imageboard";

const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.exportImages = () => {
    return db.query(
        `SELECT id, url, username, title, description, created_at FROM images ORDER BY id DESC`
    );
};

module.exports.uploadImages = (id, url, username, title, description) => {
    const q = `INSERT INTO images (id, url, username, title, description) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
    const params = [id, url, username, title, description];
    return db.query(q, params);
};

module.exports.exportImageInfo = (id) => {
    const q = `SELECT url, username, title, description, created_at FROM images WHERE id = $1`;
    const params = [id];

    return db.query(q, params);
};
