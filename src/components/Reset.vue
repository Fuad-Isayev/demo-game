<template>
  <div>
    <h1 v-if="!reset">You have to send an email</h1>
    <form v-if="reset" @submit.prevent="handleSubmit">
      <h1>Enter a new password</h1>
      <input
        class="form-control"
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="off"
      />
      <input
        class="form-control"
        type="password"
        v-model="password_confirm"
        placeholder="Confirm Password"
        autocomplete="off"
      />
      <button class="btn">Confirm</button>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Reset",
  data() {
    return {
      password: "",
      password_confirm: "",
      error: "",
    };
  },
  computed: {
    ...mapGetters(["reset"]),
  },
  methods: {
    async handleSubmit() {
      const res = await axios.get("forgot");
      const forgot = res.data;
      const user = await axios.get(`register/${forgot[0].id}`);

      if (this.password_confirm !== this.password) {
        this.error = "Passwords don't match!";
      } else if (!this.password || !this.password_confirm) {
        this.error = "All fields must be filled";
      } else {
        await axios.put(`register/${forgot[0].id}`, {
          ...user.data,
          password: this.password,
        });
        await axios.delete(`forgot/${forgot[0].id}`);
        this.$store.dispatch("reset", null);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
