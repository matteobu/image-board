import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
        };
    },

    mounted() {
        console.log("MOUNTED");
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
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
        },
        fileSelectHandler(e) {
            this.file = e.target.files[0];
            // console.log("e :>> ", e.target.files[0]);
        },
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
