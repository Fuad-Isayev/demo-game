<template>
  <div>
    <Nav />
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

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(30, 20, 0, 0.705);
  margin: 0;
  /* position: relative; */
}
.block {
  display: block;
  margin: 10px auto;
}
.error {
  color: rgb(255, 0, 0);
  /* background: rgb(194, 138, 138); */
  text-align: center;
  font-size: 32px;
  border-radius: 0px;
}
.centered {
  text-align: center;
  margin: 0 auto;
}
.btn {
  background: rgb(30, 20, 0);
  color: white;
  text-decoration: none;
  font-size: 24px;
  border: 4px solid black;
  border-radius: 10px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn:active {
  transform: translate(2px, 2px);
}
.form-control {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px auto;
  width: 300px;
  height: 40px;
  border: 2px solid black;
  color: rgb(53, 35, 0);
  border-radius: 10px;
  background: rgb(121, 112, 43);
  font-size: 22px;
}
.form-control::placeholder {
  color: rgb(52, 39, 20);
}
.empty {
  animation-name: error;
  animation-duration: 0.25s;
  animation-iteration-count: 4;
  animation-timing-function: linear;
}
@keyframes error {
  0% {
    border-color: rgb(121, 112, 43);
  }
  50% {
    border-color: red;
  }
  80% {
    border-color: rgb(121, 112, 43);
  }
  100% {
    border-color: red;
  }
}
</style>
