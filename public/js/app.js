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
            currentImageId: null,
        };
    },
    mounted() {
        // console.log("MOUNTED");
        fetch("/images")
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log({ rows });
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
                    console.log("RESULT CLICK HANLDER:>> ", result);
                    this.images.unshift(result[0]);
                })
                .catch((err) => console.log(err));
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
        },
        modalOpenClose(id) {
            console.log("VALUE OF ID on APP:  ", id);
            this.currentImageId = this.currentImageId == null ? id : null;
            console.log("VALUE OF CURRENTimgID on APP: ", this.currentImageId);
        },
    },

    components: {
        // "my-component": myComponent,
        "image-modal": imageModal,
    },
}).mount("#main");

// data: function() {}
// data() {}
// CODE FROM ENCOUNTER
// data() {
//     return {
//         name: "funky chicken",
//         age: 18,
//         headings: [
//             "a good heading",
//             "a less good heading",
//             "a much better heading",
//         ],
//     };
// },
// // created() {
// //     console.log("CREATED");
// // },
// mounted() {
//     console.log("MOUNTED");
//     fetch("/headings")
//         .then((response) => {
//             response.json();
//         })
//         .then(({ headings }) => {
//             console.log(headings);
//             this.headings = headings;
//         });
// },

// // updated() {
// //     console.log("UPDATED");
// // },

// methods: {
//     setName(headings) {
//         console.log(headings);
//         this.name = headings;
//     },
// },
