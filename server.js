const express = require("express");
const db = require("./sql/db.js");
const app = express();
const { uploader } = require("./upload");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), (req, res) => {
    console.log("req.body :>> ", req.body);
    console.log("req.file :>> ", req.file);
});

app.get("/images", (req, res) => {
    db.exportImages().then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening: 🤟 `));
