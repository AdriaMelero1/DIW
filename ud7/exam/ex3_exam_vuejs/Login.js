export default {
  data() {
    return {
      //User for v-model
      user: {
        username: '',
        password: ''
      }
    }
  },
  watch: {
    loginok(newValue, oldValue) {
      console.log(`loginok changed from ${oldValue} to ${newValue}`);
      //With this watcher you will know if the loginok "variable" has changed its value


    }
  },
  //Template with the form to log in
  template: `
    <h1>Login Page</h1>
    <form>
      <label>Username</label>
      <input v-model="user.username" id="username"></input>
      <label>Password</label>
      <input v-model="user.password" name="password"></input>
    </form>
    <button v-on:click="checkCredentials(user)">Submit</button>
  `
}