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
      <div>Frame-rate: {{ frameRate }} Ratio: {{ ratio }}</div>
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
      ratio: 1,
      frameRate: null,
      frames: 0,
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

    setTimeout(() => {
      this.getFrameRate();
      console.log("Fired");
    }, 500);
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
    loop() {
      if (!this.frameRate) {
        requestAnimationFrame(this.loop);
        this.frames += 2;
        console.log(this.frames);
      }
    },
    getFrameRate() {
      this.loop();
      setTimeout(() => {
        this.frameRate = this.frames;
        if (this.frameRate > 270 && this.frameRate < 320) {
          this.frameRate = 300;
        }
        if (this.frameRate > 40 && this.frameRate < 70) {
          this.frameRate = 60;
        }
        if (this.frameRate < 40) {
          this.frameRate = 30;
        }
        this.ratio = +(300 / this.frameRate).toFixed(2);
        this.$store.dispatch("ratio", this.ratio);
        console.log("frame rate: " + this.frameRate);
      }, 500);
    },
  },
};
</script>

<style>
.main {
  background: black;
}
</style>
