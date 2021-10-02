const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    mounted() {
        console.log("COMMENT COMPONENT MOUNTED");
        fetch("/comments/" + this.id)
            .then((response) => response.json())
            .then(({ rows }) => {
                this.comments = rows;
                // console.log(this.comments);
            });
    },

    props: ["id"],
    template: `<div class="comment-modal">   
    <form class="comment-input">
    <input v-model="comment" type="text" name="comment" placeholder="comment" autocomplete="off">
    <input v-model="username" type="text" name="username" placeholder="username" autocomplete="off">
    <button @click.prevent="submitComment" type="submit">SUBMIT</button>

    </form>
    <div id="comment-grid">
    <div v-for="comment in comments">
        <h5>{{comment.username}} commented "{{comment.comment}}" on:{{comment.created_at.slice(0,10)}}   h:{{comment.created_at.slice(11, 16)}}</h5></>
    </div>
</div>
    </div>
    
    `,
    methods: {
        submitComment() {
            // console.log("add comment", this.username, this.comment, this.id);

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
                .then(({ rows }) => {
                    // console.log("result :>> ", rows);
                    this.comments.unshift(rows[0]);
                })
                .catch((err) => console.log(err));
        },
    },
};

export { comment as commentModal };
