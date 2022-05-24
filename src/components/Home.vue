<template>
  <div>
    <div>
      <div v-if="user">
        <h1>Hello, {{ user.first_name }} {{ user.last_name }}</h1>
      </div>
      <h1 v-if="!user">You are not logged in</h1>
      <router-link class="btn" to="/game">Start a game</router-link>
      <button @click="getWidth()">Get width</button>
      <button @click="getHeight()">Get height</button>
      <div>Width: {{ width }}</div>
      <div>Height: {{ height }}</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      width: "",
      height: "",
    };
  },
  name: "Home",
  async created() {
    // let userID = localStorage.getItem("userID");
    // if (!userID) {
    //   return;
    // }
    // let userdata = await axios.get(`login`);
    // this.user = userdata.data;
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getWidth() {
      console.log("Width: " + window.innerWidth);
      this.width = window.innerWidth;
    },
    getHeight() {
      console.log("Height: " + window.innerHeight);
      this.height = window.innerHeight;
    },
  },
};
</script>

<style>
.main {
  background: black;
}
</style>
