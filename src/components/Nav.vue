<template>
  <div>
    <router-link v-if="!user" class="login btn" to="/login">Login</router-link>
    <router-link v-if="!user" class="signup btn" to="/register"
      >Signup</router-link
    >
    <router-link v-if="user" class="logout btn" @click="logOut" to="/">
      Log out
    </router-link>
    <router-link class="home btn" to="/">Home </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Nav",
  methods: {
    async logOut() {
      await axios.delete(`login/${this.user.id}`);

      this.$store.dispatch("user", null);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.btn {
  width: 80px;
  height: 40px;
  position: absolute;
  top: 0;
}
.login {
  right: 135px;
}
.signup {
  right: 40px;
}
.home {
  left: 40px;
  /* z-index: 1; */
}
.logout {
  right: 20px;
}
</style>
