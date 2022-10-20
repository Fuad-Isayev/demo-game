<template>
  <div style="padding: 8px">
    <h1 style="text-align: center">This is a login page</h1>
    <h1 v-if="user">You are already logged in</h1>
    <form v-if="!user" @submit.prevent="handleSubmit">
      <div>
        <input
          class="form-control"
          type="email"
          placeholder="Enter email"
          v-model="email"
          autocomplete="username"
          required
          oninvalid="this.setCustomValidity('This field must be filled!')"
          oninput="this.setCustomValidity('')"
        />
        <div class="error">{{ emsg }}</div>
      </div>
      <div>
        <input
          class="form-control"
          type="password"
          placeholder="Enter password"
          v-model="password"
          autocomplete="off"
          required
          oninvalid="this.setCustomValidity('This field must be filled!')"
          oninput="this.setCustomValidity('')"
        />
        <div class="error perr">{{ pmsg }}</div>
      </div>
      <button class="login btn">Login</button>
      <router-link class="forgot btn" to="/forgot">Forgot password</router-link>
    </form>
    <div class="msg"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      emsg: null,
      pmsg: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    async handleSubmit() {
      let res = await axios.get("register");
      // let logdata = await axios.get("login");

      let loggedIn = res.data.filter((user) => user.email === this.email);
      // let logpass = loggedIn.filter((user) => user.password === this.password);
      if (loggedIn.length !== 1) {
        this.emsg = "The user doesn't exist!";
        this.pmsg = null;
      } else if (this.password !== loggedIn[0].password) {
        this.pmsg = "Password is incorrect!";
        this.emsg = null;
      } else {
        await axios.post("login", loggedIn[0]);

        this.$store.dispatch("user", loggedIn[0]);

        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
