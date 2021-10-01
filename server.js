const express = require("express");
const db = require("./sql/db.js");
const app = express();
const { uploader } = require("./upload");
const s3 = require("./s3");

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, description, username } = req.body;
    const { filename } = req.file;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.uploadImages(url, username, title, description).then((response) => {
            res.json(response.rows);
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("/comments/:id", (req, res) => {
    db.getComments(req.params.id).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.post("/comments", (req, res) => {
    // console.log(req.body.id);
    const { username, comment, id } = req.body;
    db.insertAndExportComment(username, comment, id).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("/images", (req, res) => {
    db.exportImages().then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("/delete/:currentImageId", (req, res) => {
    // ("still getting the id :>> ", req.params.currentImageId);
    db.deleteComments(req.params.currentImageId)
        .then(() => {
            return db.deleteImage(req.params.currentImageId);
        })
        .then(() => {
            console.log("result from ");
            return res.status(201).end();
        });
});

app.get("/data/:id", (req, res) => {
    db.exportImageInfo(req.params.id).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("/images/:lastIdOnScreen", (req, res) => {
    db.exportMoreImages(req.params.lastIdOnScreen).then(({ rows }) => {
        return res.json({ rows });
    });
});

app.get("*", (req, res) => {
    // console.log("request path", req.path);
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening: 🤟 `));
