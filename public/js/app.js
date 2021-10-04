import * as Vue from "./vue.js";
import { imageModal } from "./image-modal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            currentImageId: location.pathname.slice(1) || null,
            lastIdOnScreen: null,
            lowestId: null,
            morebutton: true,
        };
    },
    mounted() {
        addEventListener("popstate", (e) => {
            // console.log(location.pathname, e.state);
            this.currentImageId = location.pathname.slice(1) || null;
        });

        console.log("Vue APP MOUNTED");
        fetch("/images")
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log("this is the first ROWS of OBJECTS", { rows });
                this.images = rows;
                let lastObject = rows.length - 1;
                let ultimo = rows[lastObject].id;
                if (ultimo == rows[0].lowestId) {
                    this.morebutton = false;
                }

                // console.log("THIS.IMAGES after FETCH /images:>> ", this.images);
            })
            .catch(console.log);
    },
    methods: {
        clickHandler() {
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((response) => response.json())
                .then((result) => {
                    // console.log("RESULT CLICK HANLDER:>> ", result);
                    this.images.unshift(result[0]);
                })
                .catch((err) => console.log(err));
        },
        resetInput() {
            this.title = "";
            this.description = "";
            this.username = "";
            this.file = null;ß
        },

        moreImages() {
            let lastImage = this.images.length - 1;
            this.lastIdOnScreen = this.images[lastImage].id;

            fetch("/images/" + this.lastIdOnScreen)
                .then((response) => response.json())
                .then(({ rows }) => {
                    let lastObject = rows.length - 1;
                    let ultimo = rows[lastObject].id;
                    if (ultimo == rows[0].lowestId) {
                        this.morebutton = false;
                    }

                    for (let i = 0; i < rows.length; i++) {
                        this.images.push(rows[i]);
                    }
                })
                .catch((err) => console.log(err));
        },

        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
        modalOpenClose(id) {
            if (id) {
                history.pushState({}, "", "/" + id);
                // console.log("IF", location.pathname.slice(1));
            } else {
                history.pushState({}, "", "/");
                // console.log("ELSE", location.pathname.slice(1));
            }
            this.currentImageId = this.currentImageId == null ? id : null;

            // console.log("OUTSIDE THE IF ELSE", location.pathname.slice(1));
        },

        historyReplace() {
            history.replaceState({}, "", "/");
            this.currentImageId = this.currentImageId == null;
        },

        deleteImage() {
            // console.log(
            //     "delete IMAGE function currentImageId:>> ",
            //     this.currentImageId
            // );
            let imageToFilter = this.currentImageId;
            this.images = this.images.filter(function filterByID(item) {
                if (item.id !== imageToFilter) {
                    return true;
                }
            });
            fetch("/delete/" + this.currentImageId)
                .then((result) => {
                    this.currentImageId = null;
                    history.pushState({}, "", "/");
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                });
        },
    },

    components: {
        "image-modal": imageModal,
    },
}).mount("#main");
