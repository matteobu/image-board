const express = require("express");
const db = require("./sql/db.js");
const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.get("/images", (req, res) => {
    db.exportImages().then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening: 🤟 `));
