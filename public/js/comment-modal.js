const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    mounted() {
        console.log("IM MOUNTED");
        fetch("/comments/" + this.id)
            .then((response) => response.json())
            .then(({ rows }) => {
                this.comments = rows;
                console.log(this.comments);
            });
    },

    props: ["id"],
    template: `<div class="comment-modal">
    <h6>I'M THE COMMENT COMPONENT AND IM BEAUTIFUL</h6>
    
    <form class="form-input">
    <input v-model="comment" type="text" name="comment" placeholder="comment">
    <input v-model="username" type="text" name="username" placeholder="username">
    <button @click.prevent="submitComment" type="submit">SUBMIT</button>

    </form>
    <div id="comment-grid">
    <div v-for="comment in comments">
        <h6>{{comment.username}} commented {{comment.comment}} on {{comment.created_at}}</h6>
    </div>
</div>
    </div>
    
    `,
    methods: {
        submitComment() {
            console.log("add comment", this.username, this.comment, this.id);

            const newComment = {};
            newComment.username = this.username;
            newComment.comment = this.comment;
            newComment.id = this.id;

            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
        },
    },
};

export { comment as commentModal };
