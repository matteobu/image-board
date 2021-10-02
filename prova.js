// let images = [
//     {
//         id: 39,
//         url: "https://s3.amazonaws.com/spicedling/hofMu-QWrIn4SwPb0I34CEqxBslbmkCN.jpeg",
//         username: "eggleston",
//         title: "yellow building",
//         description: "grey car",
//         created_at: "2021-10-02T08:19:37.556Z",
//     },
//     {
//         id: 37,
//         url: "https://s3.amazonaws.com/spicedling/nuMZokAFFAPvors0jKbP3PLlW5dxvdRA.jpg",
//         username: "",
//         title: "bi-colors cars",
//         description: "bi colors cars",
//         created_at: "2021-10-01T15:23:01.404Z",
//     },
//     {
//         id: 24,
//         url: "https://s3.amazonaws.com/spicedling/T-xsFp9t02hSR0apfl4PzaXNjz0DlIZP.jpg",
//         username: "matteo",
//         title: "Car in window",
//         description: "car window",
//         created_at: "2021-09-30T08:53:23.676Z",
//     },
// ];
let images = [
    {
        id: 39,
        url: "https://s3.amazonaws.com/spicedling/hofMu-QWrIn4SwPb0I34CEqxBslbmkCN.jpeg",
        username: "eggleston",
        title: "yellow building",
        description: "grey car",
        created_at: "2021-10-02T08:19:37.556Z",
    },
    {
        id: 37,
        url: "https://s3.amazonaws.com/spicedling/nuMZokAFFAPvors0jKbP3PLlW5dxvdRA.jpg",
        username: "",
        title: "bi-colors cars",
        description: "bi colors cars",
        created_at: "2021-10-01T15:23:01.404Z",
    },
    {
        id: 24,
        url: "https://s3.amazonaws.com/spicedling/T-xsFp9t02hSR0apfl4PzaXNjz0DlIZP.jpg",
        username: "matteo",
        title: "Car in window",
        description: "car window",
        created_at: "2021-09-30T08:53:23.676Z",
    },
];

let currentImageId = 24;
images = images.filter(function filterByID(item) {
    console.log("this.currentImageId :>> ", currentImageId);
    if (item.id !== currentImageId) {
        return true;
    }
});

// console.log("Filtered Array\n", arrByID);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

// console.log("Number of Invalid Entries = ", invalidEntries);
// Number of Invalid Entries = 5
