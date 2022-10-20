<template>
  <div>
    <div class="text-center">
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
    <div class="container my-4 border border-3 border-primary pb-5">
      <div class="row text-center">
        <div class="col">
          <h1>Room</h1>
          <div :key="user.id" class="container" v-for="user in users">
            <div class="row">
              <div class="col-4 border border-2 border-success my-1">
                {{ user.id }}
              </div>
              <div class="col-8 border border-2 border-primary my-1">
                {{ user.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-4 border border-secondary p-3">
      <div class="row">
        <div class="col-10">
          <input
            type="text"
            placeholder="Enter your message"
            class="form-control"
            v-model="this.message"
          />
        </div>
        <div class="col-2">
          <button type="submit" @click="sendMessage()" class="btn btn-primary">
            Send
          </button>
        </div>
      </div>
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
      playerID: null,
      playerRef: null,
      users: {},
      allPlayersRef: null,
      message: "",
    };
  },
  name: "Home",

  /*async*/ created() {
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

    this.auth();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    auth() {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          //You're logged in.
          this.playerID = user.uid;
          this.playerRef = firebase.database().ref(`players/${this.playerID}`);

          this.playerRef.set({
            name: "Downie",
            id: this.playerID,
            message: "Hello",
          });

          // setTimeout(() => {
          //   this.playerRef.set({
          //     name: "Downie",
          //     id: this.playerID,
          //     message: "Changed",
          //   });
          // }, 3000);

          //Remove me from Firebase when i disconnect
          this.playerRef.onDisconnect().remove();

          //Init Game
          this.initGame();
        } else {
          //You're logged out.
        }
      });

      firebase
        .auth()
        .signInAnonymously()
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          //...
          console.log(errorCode, errorMessage);
        });
    },
    sendMessage() {
      console.log(this.users[this.playerID]);
      // this.users[this.playerID].message = this.message;
      this.playerRef.set({ name: "Downie", id: this.playerID, message: "s" });
    },
    initGame() {
      this.allPlayersRef = firebase.database().ref(`players`);

      this.allPlayersRef.on("value", (snapshot) => {
        //Fires whenever a change occurs
        console.log("Value changed");
        this.users[this.playerID] = snapshot.val() || {};
      });

      this.allPlayersRef.on("child_added", (snapshot) => {
        //Fires whenever a new node is added to the tree
        const addedPlayer = snapshot.val();
        this.users[addedPlayer.id] = addedPlayer;
      });
    },

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
        // console.log(this.frames);
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

<style></style>
