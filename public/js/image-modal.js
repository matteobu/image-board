import { commentModal } from "./comment-modal.js";

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
    template: `<div  class=" image-grid-modal modal-overlay">
    <div class="image-modal">

    <img class="img-in-modal" :src="url">
    <h4>{{title}}</h4> 
    <h6>{{description}}</h6> 
    <h6 @click="functionToCloseModal(null)">close</h6>
    <h5>uploaded by {{username}} on {{created_at}}</h5> 

    

    <comment-modal v-if="id" :id="id"> </comment-modal>


    </div>  
    </div>

    `,

    components: {
        // "my-component": myComponent,
        "comment-modal": commentModal,
    },
};

export { modal as imageModal };

///
// v-bind:id="currentImageId" v-on:modal-off="modalOpenClose" v-if="currentImageId" :id="currentImageId"
