import * as Vue from "./vue.js";

Vue.createApp({
    // In the data function you must return an object
    // with an images property.
    // The value of this property
    // cannot be set to anything useful until the app mounts.
    // The initial value can be an empty array or null
    // but the property must be there.
    data() {
        return {
            images: [],
        };
    },
    // In the mounted function
    // it should make a network request using fetch
    // to get the image objects
    // when the request is successful,
    // it should set the images data property to the array
    // retrieved

    mounted() {
        console.log("MOUNTED");
        fetch("/images")
            .then((response) => response.json())
            .then(({ rows }) => {
                console.log({ rows });
                this.images = rows;
            });
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
