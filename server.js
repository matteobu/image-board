const express = require("express");
const db = require("./sql/db.js");
const app = express();
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req.body :>> ", req.body);
    // console.log("req.file :>> ", req.file);
    // console.log("POST /upload.json Router");

    const { title, description, username } = req.body;
    const { filename } = req.file;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.uploadImages(url, username, title, description).then((response) => {
            // console.log("response.rows :>> ", response.rows);
            res.json(response.rows);
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("/images", (req, res) => {
    db.exportImages().then(({ rows }) => {
        return res.json({ rows });
    });
});
app.get("/data/:id", (req, res) => {
    db.exportImageInfo(req.params.id).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening: 🤟 `));
