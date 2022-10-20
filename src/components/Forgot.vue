<template>
  <div>
    <div class="centered" v-if="reset">
      <h1>
        An email sent to:
        <span style="color: green">{{ entered_email }} {{ mail }}</span>
      </h1>
      <h2>If you want to reset password click the link bellow</h2>
      <router-link class="btn" to="/reset">Reset password</router-link>
      <h2>If you want to change email click the link bellow</h2>
      <router-link class="btn" @click="changeReset" to="/forgot"
        >Change email</router-link
      >
    </div>
    <form v-if="!reset" @submit.prevent="handleSubmit">
      <h1 class="centered">Enter your email</h1>
      <input
        class="form-control"
        type="email"
        v-model="email"
        placeholder="Email"
        autocomplete="off"
      />
      <button class="btn">Send</button>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      error: "",
      mail: "",
    };
  },
  computed: {
    ...mapGetters(["reset"]),
    entered_email() {
      if (this.reset) {
        console.log("reset is " + this.$store.state.reset);
        console.log("user is " + this.$store.state.user);
        this.getEmail();
      } else {
        console.log("reset is " + this.$store.state.reset);
        console.log("user is " + this.$store.state.user);
      }
    },
  },
  // created() {
  //   this.entered_email;
  // },
  methods: {
    async getEmail() {
      const res = await axios.get("forgot");
      const some = res.data;
      this.mail = some[0].email;
    },
    async handleSubmit() {
      const res = await axios.get("register");
      const user = res.data.filter((user) => user.email === this.email);
      const forgot = await axios.get("forgot");

      if (!this.email) {
        this.error = "All fields must be filled";
      } else if (user.length !== 1) {
        this.error = "The user doesn't exist";
      } else if (forgot.data.length !== 0) {
        this.error = "You have already sent an email";
      } else {
        const post = await axios.post("forgot", user[0]);
        this.$store.dispatch("reset", user[0]);
      }
    },
    async changeReset() {
      const res = await axios.get("forgot");
      const forgot = res.data;
      await axios.delete(`forgot/${forgot[0].id}`);
      this.$store.dispatch("reset", null);
    },
  },
};
</script>

<style></style>
