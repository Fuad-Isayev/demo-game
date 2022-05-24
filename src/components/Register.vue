<template>
  <div style="padding: 8px">
    <h1>This is a register page</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <h3 class="centered">First name</h3>
        <input
          class="form-control"
          autocomplete="off"
          type="text"
          placeholder="First name"
          v-model="first_name"
        />
      </div>
      <div>
        <h3 class="centered">Last name</h3>
        <input
          class="form-control"
          autocomplete="off"
          type="text"
          placeholder="Last name"
          v-model="last_name"
        />
      </div>
      <div>
        <h3 class="centered">Email</h3>
        <input
          class="form-control"
          autocomplete="off"
          type="email"
          placeholder="Email"
          v-model="email"
          required
          oninvalid="this.setCustomValidity('This field must be filled')"
          oninput="this.setCustomValidity('')"
        />
      </div>
      <div>
        <h3 class="centered">Password</h3>
        <input
          class="form-control"
          autocomplete="off"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <h3 class="centered">Confirm Password</h3>
        <input
          class="form-control"
          autocomplete="off"
          type="password"
          placeholder="Confirm Password"
          v-model="password_confirm"
        />
      </div>
      <div><button class="btn">Confirm</button></div>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      password_confirm: null,
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      const res = await axios.get("register");

      let arr1 = res.data.filter((user) => user.email === this.email);
      if (arr1.length === 1) {
        console.log("This email is already registered");
        this.error = "This email is already registered";
      } else if (
        !this.password ||
        !this.password_confirm ||
        !this.first_name ||
        !this.last_name ||
        !this.email
      ) {
        this.error = "All fields must be filled";
      } else if (this.password_confirm !== this.password) {
        this.error = "Passwords don't match";
      } else {
        await axios.post("register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
        console.log("The user is successfully created!");
      }
    },
  },
};
</script>

<style scoped>
.btn {
  width: 120px;
}
</style>
