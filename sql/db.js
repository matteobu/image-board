const spicedPg = require("spiced-pg");
const { dbUserName, dbPassword } = require("../secrets");

const database = "mustard-imageboard";

const db = spicedPg(
    `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
);

module.exports.exportImages = () => {
    return db.query(
        `SELECT * 
        FROM images 
        ORDER BY id DESC
        LIMIT 6`
    );
};

module.exports.exportMoreImages = (lastIdOnScreen) => {
    return db.query(
        `SELECT id, url, username, title, description, (
                    SELECT id FROM images
                    ORDER BY id ASC
                    LIMIT 1
                ) AS "lowestId" FROM images
                WHERE id < $1
                ORDER BY id DESC
                LIMIT 6;`,
        [lastIdOnScreen]
    );
};

// SELECT url, title, id, (
//     SELECT id FROM images
//     ORDER BY id ASC
//     LIMIT 1
// ) AS "lowestId" FROM images
// WHERE id < $1
// ORDER BY id DESC
// LIMIT 10;

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.exportImageInfo = (id) => {
    const q = `SELECT url, username, title, description, created_at 
                FROM images 
                WHERE id = $1`;
    const params = [id];

    return db.query(q, params);
};

module.exports.insertAndExportComment = (username, comment, image_id) => {
    const params = [username, comment, image_id];
    const q = `INSERT INTO comments (username, comment, image_id) 
                VALUES ($1, $2, $3)
                RETURNING *`;
    return db.query(q, params);
};

module.exports.getComments = (id) => {
    const params = [id];
    const q = `SELECT * FROM comments WHERE image_id=$1`;
    return db.query(q, params);
};
// comment TEXT,
// username VARCHAR NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// image_id INT NOT NULL REFERENCES images(id)
