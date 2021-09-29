const modal = {
    data() {
        return {
            // id: this.id,
            url: "",
            username: "",
            title: "",
            description: "",
            created_at: "",
        };
    },
    mounted() {
        fetch("/data/" + this.id)
            .then((response) => response.json())
            .then(({ rows }) => {
                // console.log("rows :>> ", rows);
                // data = {}
                Object.assign(this, rows[0]);
                // console.log("this :>> ", this.url);
            });
        console.log("IM MOUNTED");
    },
    methods: {
        functionToCloseModal() {
            this.$emit("modal-off");
        },
    },

    props: ["id"],
    template: `<div @click="functionToCloseModal()" class=" image-grid-modal modal-overlay">
    <div class="image-modal">
    <img class="img-in-modal" :src="url">
    <h4>{{title}}</h4> 
    <h6>{{description}}</h6> 
    <h5>uploaded by {{username}} on {{created_at}}</h5> 


    </div>  
    </div>

    `,
};

export { modal as imageModal };

// {
//     /* <button @click=closeModal>close</button><br/> */
// }class=""
// <h3>I am the modal. Current IMG ID: {{id}} </h3>
//     <img src="info.url"><br/>
//     Username: {{info.username}}<br/>
//     Title: {{info.title}}<br/>
//     Description: {{info.description}}<br/>
//     Url: {{info.url}}<br/>
//     Date: {{info.created_at}}<br/>
