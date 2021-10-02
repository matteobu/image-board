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
        console.log("IMAGE COMPONENT MOUNTED");
        if (isNaN(this.id)) {
            // console.log("isNAN IS WORKING");
            this.$emit("off-error");
        } else {
            fetch("/data/" + this.id)
                .then((response) => response.json())
                .then(({ rows }) => {
                    if (rows.length <= 0) {
                        this.$emit("off-error");
                    } else {
                        // console.log("rows IN IMAGE MODAL SIDE:>> ", rows);
                        Object.assign(this, rows[0]);
                    }
                });
        }
    },

    methods: {
        functionToCloseModal() {
            this.$emit("modal-off");
        },
        functionToDeleteImage() {
            this.$emit("delete-image");
        },
    },

    props: ["id"],
    template: `<div  class=" image-grid-modal modal-overlay">
    <div class="image-modal">
    <h6 @click="functionToCloseModal(null)" class="close-in-images">close</h6>

    <img class="img-in-modal" :src="url">
    <h5>uploaded by {{username}} on: {{created_at.slice(0,10)}}</h5> 
    <div class="title-in-comment">{{title}}</div> 
    <h6>description: {{description}}</h6> 

    

    <comment-modal v-if="id" :id="id"> </comment-modal>
    <div class="delete-immage-image-modal" @click="functionToDeleteImage()">DELETE IMAGE</div>  



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
