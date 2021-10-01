import * as Vue from "./vue.js";
// import { myComponent } from "./my-component.js";
import { imageModal } from "./image-modal.js";

// console.log(imageModal);
// console.log(myComponent);

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            // currentImageId: null,
            currentImageId: location.pathname.slice(1),
            lastIdOnScreen: null,
            lowestId: null,
            morebutton: true,
        };
    },
    mounted() {
        // console.log("MOUNTED");
        fetch("/images")
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log("this is the first ROWS of OBJECTS", { rows });
                this.images = rows;
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
            } else {
                history.pushState({}, "", "/");
            }
            this.currentImageId =
                this.currentImageId == location.pathname.slice(1)
                    ? id
                    : location.pathname.slice(1);
        },
    },

    components: {
        "image-modal": imageModal,
    },
}).mount("#main");
