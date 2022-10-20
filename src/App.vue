<template>
  <div>
    <Nav v-if="!$route.meta.hideNavbar" />
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
  async created() {
    let res = await axios.get("login");
    let forgot = await axios.get("forgot");
    // this.user = res.data[0];

    this.$store.dispatch("user", res.data[0]);
    this.$store.dispatch("reset", forgot.data[0]);
  },
};
</script>

<style></style>
