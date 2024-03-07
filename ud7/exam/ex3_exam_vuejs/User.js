export default {
  //User as a prop to print its info and template to show user info
  props: ['user'],
  template: `
    <h1>User Page</h1>

    <button v-on:click="gologin">Go back</button>
  `,

  //Method to go back to login
  methods: {
    gologin() {
      this.$router.push("/login");
    }
  }
}