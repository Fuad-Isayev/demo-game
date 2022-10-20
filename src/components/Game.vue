<template>
  <div class="screen">
    <div class="gameContainer">
      <div class="sky">
        <div class="money">${{ Math.floor(money) }}</div>
        <div v-show="game_finished">
          <h1>{{ message }}</h1>
          <button class="btn" @click="replay()">Play again</button>
        </div>
      </div>
      <div class="ground">
        <!-- player'castle -->
        <div class="player_castle_health">
          {{ Math.floor(player_castle.health) }}/{{
          player_castle.initial_health
          }}
        </div>
        <div class="player_castle"></div>

        <!-- enemy's catsle -->
        <div class="enemy_castle_health">
          {{ Math.floor(enemy_castle.health) }}/{{
          enemy_castle.initial_health
          }}
        </div>
        <div class="enemy_castle"></div>

        <!-- player soldier -->
        <div :key="soldier" v-for="soldier in player_soldiers">
          <div class="player_soldier" :style="{
            top: soldier.top + '%',
            'z-index': soldier.z,
            left: soldier.left + '%',
          }"></div>
        </div>

        <!-- enemy soldier -->
        <div :key="soldier" v-for="soldier in enemy_soldiers">
          <div class="enemy_soldier" :style="{
            top: soldier.top + '%',
            'z-index': soldier.z,
            right: soldier.right + '%',
          }"></div>
        </div>
      </div>
      <div class="control_bar">
        <div v-show="!game_finished">
          <button class="player_train" @click="train_player()">
            TRAIN ${{ player_cost }}
          </button>
          <button class="upgrade" @click="upgrade()">{{ upg_msg }}</button>
          <button class="enemy_train" @click="train_enemy()">TRAIN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Game",
  data() {
    return {
      // user: "",
      move: {
        x: 0.02,
        y: 5,
      },
      enemy_position: 87,
      player_position: 87,
      player_soldiers: [],
      enemy_soldiers: [],
      player_stopped: true,
      enemy_stopped: true,
      player_cost: 50,
      enemy: {},
      player_castle: { initial_health: 10000, health: 10000 },
      enemy_castle: { initial_health: 10000, health: 10000 },
      game_finished: false,
      winner: "",
      message: "",
      money: 0,
      income: 5,
      upgrades: 0,
      max_upgrades: 5,
      upgrade_cost: 50,
      interval: 5000,
      spawning: null,
      // ctx: this.canvas.getContext("2d"),
    };
  },
  methods: {
    //UPGRADE INCOME
    upgrade() {
      console.log("income: " + this.income);
      console.log("ratio: " + this.ratio);
      if (this.money > this.upgrade_cost && this.upgrades < this.max_upgrades) {
        this.income = this.income * 1.5;
        this.money -= this.upgrade_cost;
        this.upgrade_cost = this.upgrade_cost * 1.3;
        this.upgrades++;
      }
    },

    //REPLAY
    replay() {
      this.game_finished = false;
      this.player_soldiers = [];
      this.enemy_soldiers = [];
      this.player_castle.health = this.player_castle.initial_health;
      this.enemy_castle.health = this.enemy_castle.initial_health;
      this.money = 0;
      this.income = 5 * this.ratio;
      this.upgrades = 0;
      this.upgrade_cost = 50;
      this.loop();
      this.interval = 5000;
      this.spawn();
    },
    // async getData() {
    //   this.user = await this.$store.state.user;
    // },

    //TRAIN PLAYER
    train_player() {
      if (this.money >= this.player_cost) {
        this.game_finished = false;
        this.player_soldiers.push({
          top: Math.floor(Math.random() * 35 + 1),
          left: 12.5,
          power: 5 * this.ratio,
          health: 1000,
        });
        console.log("Players: " + this.player_soldiers.length);
        this.player_soldiers.forEach((element) => {
          element.z = Math.floor(-1 + element.top);
        });
        this.money -= this.player_cost;
      }
      console.log("ratio: " + this.ratio);
      console.log("income: " + this.income);
      console.log("move.x: " + this.move.x);
    },

    //TRAIN ENEMY
    train_enemy() {
      this.game_finished = false;
      this.enemy_soldiers.push({
        top: Math.floor(Math.random() * 35 + 1),
        right: 12.5,
        power: 3 * this.ratio,
        health: 1000,
      });
      console.log("Enemies: " + this.enemy_soldiers.length);
      this.enemy_soldiers.forEach((element) => {
        element.z = Math.floor(-1 + element.top);
      });
      console.log("income: " + this.income);
    },

    //SPAWN ENEMY
    spawn() {
      this.spawning = setTimeout(() => {
        this.spawn();
        if (this.interval > 200) {
          this.interval -= 100;
        }
        this.train_enemy();
        console.log("interval = " + this.interval);
      }, this.interval);
    },

    player_atack() {
      if (this.enemy_soldiers.length > 0) {
        //ATACK ENEMY
        if (this.enemy_soldiers[0].health > 0) {
          this.enemy_soldiers[0].health -= this.player_soldiers[0].power;
          // console.log("enemys health is " + this.enemy_soldiers[0].health);
        } else {
          this.enemy_soldiers.shift();
          console.log("Enemies: " + this.enemy_soldiers.length);
        }
      } else {
        // ATACK CASTLE
        if (
          this.enemy_castle.health > 0 &&
          this.player_soldiers[0].left + 5 >= 87
        ) {
          console.log("castle" + this.enemy_castle.health);
          console.log("enemy position is " + this.enemy_position);
          this.enemy_castle.health -= this.player_soldiers[0].power;
        } else if (this.enemy_castle.health <= 0) {
          this.game_finished = true;
          clearTimeout(this.spawning);
          this.winner = "Player";
        }
      }
    },

    enemy_atack() {
      if (this.player_soldiers.length > 0) {
        //ATACK PLAYER
        if (this.player_soldiers[0].health > 0) {
          this.player_soldiers[0].health -= this.enemy_soldiers[0].power;
          // console.log("players health is " + this.player_soldiers[0].health);
        } else {
          this.player_soldiers.shift();
          console.log("Players: " + this.player_soldiers.length);
        }
      } else {
        // ATACK CASTLE
        if (
          this.player_castle.health > 0 &&
          this.enemy_soldiers[0].right + 5 >= 87
        ) {
          console.log("player_castle" + this.player_castle.health);
          console.log("player position is " + this.player_position);
          this.player_castle.health -= this.enemy_soldiers[0].power;
        } else if (this.player_castle.health <= 0) {
          this.player_castle.health = 0;
          this.game_finished = true;
          clearTimeout(this.spawning);
          this.winner = "Enemy";
        }
      }
    },

    //LOOP
    loop() {
      if (!this.game_finished) {
        window.requestAnimationFrame(this.loop);
      } else {
        console.log("Game finished");
        console.log(this.winner + " win!");
        this.message = `${this.winner} win!`;
      }

      //MAKE MONEY
      this.money = this.money + this.income / 300;

      //MOVE Player
      this.player_soldiers.forEach((element) => {
        if (element.left + 5 < this.enemy_position) {
          element.left += this.move.x;
          this.player_stopped = false;
        } else {
          this.player_stopped = true;
          this.player_atack();
        }
      });

      //MOVE Enemy
      this.enemy_soldiers.forEach((element) => {
        if (element.right + 5 < this.player_position) {
          element.right += this.move.x;
          this.enemy_stopped = false;
        } else {
          this.enemy_stopped = true;
          this.enemy_atack();
        }
      });

      //Get Max of Enemy Right
      let max_enemy = this.enemy_soldiers.reduce((previous, current) => {
        return Math.max(previous, current.right);
      }, 12.5);

      //Get Max of Player Left
      let max_player = this.player_soldiers.reduce((previous, current) => {
        return Math.max(previous, current.left);
      }, 12.5);

      //Change enemy_position

      if (this.enemy_soldiers.length > 0) {
        if (!this.enemy_stopped) {
          this.enemy_position = 87;
          this.enemy_position =
            this.enemy_position - (max_enemy - 7.36 - this.move.x);
        }
      } else {
        this.enemy_position = 87;
      }

      //Change player_position
      if (this.player_soldiers.length > 0) {
        if (!this.player_stopped) {
          this.player_position = 87;
          this.player_position =
            this.player_position - (max_player - 7.36 - this.move.x);
          // console.log("player position is " + (this.player_position + 70));
        }
      } else {
        this.player_position = 87;
      }
    },
  },
  created() {
    this.loop();

    this.multiply;

    //SPAWN ENEMY
    this.spawn();

    //UPGRADE PRICE
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "f":
          this.move.x = 0.2;
          break;
        case "q":
          this.money += 1000;
          console.log(this.income);
          break;
        case "a":
          this.money -= 1000;
          console.log(this.income);
          break;
        case "i":
          this.interval -= 1000;
          break;
        case "o":
          this.interval += 1000;
          break;
        case "k":
          this.enemy_soldiers.shift();
          break;
        case "t":
          this.train_player();
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "f":
          this.move.x = 0.02;
          break;
        case "i":
          console.log(this.interval);
          break;
        case "c":
          console.log(this.enemy_soldiers);
      }
    });
  },
  computed: {
    ...mapGetters(["ratio"]),
    upg_msg() {
      if (this.upgrades < this.max_upgrades) {
        return `UPGRADE $ ${Math.floor(this.upgrade_cost)}`;
      } else {
        return "MAX";
      }
    },
    // ratio() {
    //   if (window.innerWidth < 650) {
    //     return 5;
    //   } else {
    //     return 1;
    //   }
    // },
    multiply() {
      this.income *= this.ratio;
      this.move.x *= this.ratio;
    },
  },
};
</script>

<style scoped>
.gameContainer {
  width: 100vw;
  aspect-ratio: 2.13;
}

.sky {
  background: rgb(173, 216, 230);
  width: 100%;
  height: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ground {
  position: relative;
  background: green;
  width: 100vw;
  height: 30%;
}

.control_bar {
  background: rgb(168, 132, 132);
  width: 100vw;
  height: 20%;
  position: relative;
}

/* CASTLES */
.player_castle,
.enemy_castle {
  background: url('../assets/castle.png');
  background-repeat: no-repeat;
  width: 7%;
  aspect-ratio: 1/2;
  position: absolute;
  bottom: 50%;
  font-size: 18px;
  text-align: center;
}

.player_castle_health,
.enemy_castle_health {
  position: absolute;
  bottom: 150%;
  font-size: 1.2vw;
}

.player_castle_health {
  left: 5.3%;
}

.enemy_castle_health {
  right: 5.3%;
}

.player_castle {
  left: 5%;
}

.enemy_castle {
  right: 5%;
}

/* SOLDIERS */
.player_soldier,
.enemy_soldier {
  width: 5%;
  aspect-ratio: 1/1.71;
  position: absolute;
  top: 0;
}

.player_soldier {
  background: rgba(0, 0, 255, 0.611);
  left: 175px;
  border: 0.15vw solid red;
}

.enemy_soldier {
  background: rgba(255, 0, 0, 0.611);
  right: 175px;
  border: 0.15vw solid blue;
}

/* TRAIN_BUTTONS */
.player_train,
.enemy_train,
.upgrade {
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  font-size: 1.2vw;
  padding: 0;
}

.player_train {
  left: 1%;
}

.enemy_train {
  right: 1%;
}

.upgrade {
  left: 15%;
}

.money {
  position: absolute;
  left: 8px;
  top: 8px;
  font-size: 24px;
}

.screen {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
