const component = {
    data() {
        return {
            heading: "im a component and im global",
        };
    },
    mounted() {},
    methods: {
        changeHeadingAndRequestNameChange() {
            this.heading = "im gettin tired ";
            this.$emit("namechange", Date.now());
            console.log(this.color);
        },
    },
    props: ["color", "age"],
    template: `<div>
                <h3 :title="color" :style="'color:' + color" @click="changeHeadingAndRequestNameChange()">
                {{heading}}   ({{color}}) <em>{{age}}</em>
                </h3>        
                </div>`,
};

export { component as myComponent };
