<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="row container-fluid text-white">
      <div class="col-9">
        <router-link class="navbar-brand" to="/">Home </router-link>
      </div>
      <div class="col-3">
        <ul class="navbar-nav list-group-horizontal justify-content-end">
          <li class="list-group-item mx-2">
            <router-link v-if="!user" class="nav-link" to="/login"
              >Login</router-link
            >
          </li>
          <li class="list-group-item mx-2">
            <router-link v-if="!user" class="nav-link" to="/register"
              >Signup</router-link
            >
          </li>
          <li class="list-group-item mx-2">
            <router-link v-if="user" class="nav-link" @click="logOut" to="/">
              Log out
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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

<style></style>
