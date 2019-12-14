<template>
  <div class="DayView">
    <div class="day-header">
      <h3 class="day-name">{{ weekdayStr }}</h3>
      <!-- <h4 class="wd">{{ weekday }}</h4> -->
      <h4 class="day-date">{{ dateStr }}</h4>
      <!-- <p>{{ date.slice(4, 10) }}</p> -->
    </div>
    <div class="day-content" :class="weekdayStr">
      <div v-if="isYesterday">
        <span v-if="isWeekday">You should have watered these already.</span>

        <!-- <span>{{isWeekday}}</span> -->
      </div>

      <div class="day-plant-wrap" v-if="!isYesterday">
        <div class="day-plant plant" v-for="(plant, idx) in plants" :key="idx">
          {{ plant.name }}
          <button
            class="update-btn"
            v-if="isToday"
            v-on:click="triggerUpdate"
            :data-id="plant._id"
            :data-name="plant.name"
          >Water</button>
        </div>
      </div>

      <div class="weekend-plant-wrap" v-if="!isYesterday">
        <div
          class="weekend-plant plant"
          v-for="(plant, idx) in weekendPlants"
          :key="idx+plants.length"
        >
          {{ plant.name }}
          <button
            class="update-btn"
            v-if="isToday"
            v-on:click="triggerUpdate"
            :data-id="plant._id"
            :data-name="plant.name"
          >Water</button>
        </div>
      </div>

      <div class="overdue-plant-wrap" v-if="!isYesterday">
        <div class="overdue-plant plant" v-for="(plant, idx) in overduePlants" :key="idx + 45">
          {{ plant.name }}
          <button
            class="update-btn"
            v-if="isToday"
            v-on:click="triggerUpdate"
            :data-id="plant._id"
            :data-name="plant.name"
          >Water</button>
        </div>
      </div>
    </div>
    <div class="update-text">{{ updateText }}</div>
  </div>
</template>

<script>
import PlantService from "@/services/PlantService";

export default {
  name: "DayView",
  props: {
    date: Date,
    weekday: Number
  },
  data() {
    return {
      allPlants: [],
      updateText: ""
      // dayPlants: [],
      // latePlants: [],
      // satSunPlants: [],
    };
  },
  computed: {
    weekdayStr: function() {
      switch (this.weekday) {
        case 0:
          return "Sun";
        case 1:
          return "Mon";
        case 2:
          return "Tue";
        case 3:
          return "Wed";
        case 4:
          return "Thu";
        case 5:
          return "Fri";
        case 6:
          return "Sat";
        default:
          return "???";
      }
    },
    dateStr: function() {
      return this.date.toDateString().slice(4, 10);
    },
    fullDateStr: function() {
      return this.date.toDateString();
    },
    plants: function() {
      let output = [];
      //check which plants are due today.
      if (this.weekday > 0 && this.weekday < 6) {
        for (let i = 0; i < this.allPlants.length; i++) {
          const tmpDay = this.allPlants[i].lastWater;
          const dayDiff = this.getDayDiff(tmpDay);
          let tmp = this.allPlants[i];
          if (dayDiff % tmp.waterAfter == 0) {
            output.push(tmp);
          }
        }
      }

      return output;
    },
    weekendPlants: function() {
      let output = [];

      // not dry becuase v-if and v-for are ill-advised

      if (this.weekday === 1) {
        for (let i = 0; i < this.allPlants.length; i++) {
          const tmpDay = this.allPlants[i].lastWater;
          let dayDiff = this.getDayDiff(tmpDay);
          dayDiff--;
          let tmp = this.allPlants[i];
          if (dayDiff % tmp.waterAfter == 0) {
            output.push(tmp);
          }
        }
      }

      if (this.weekday === 5) {
        for (let i = 0; i < this.allPlants.length; i++) {
          const tmpDay = this.allPlants[i].lastWater;
          let dayDiff = this.getDayDiff(tmpDay);
          dayDiff++;
          let tmp = this.allPlants[i];
          if (dayDiff % tmp.waterAfter == 0) {
            output.push(tmp);
          }
        }
      }

      return output;
    },
    overduePlants: function() {
      // this.getPlants();

      let output = [];

      if (this.isToday) {
        // tried array.map but it wasn't working as expected so going old-school
        for (let i = 0; i < this.allPlants.length; i++) {
          // console.log(this.allPlants[i])
          const dayDiff = this.getDayDiff(this.allPlants[i].lastWater);

          if (dayDiff > this.allPlants[i].waterAfter) {
            output.push(this.allPlants[i]);
          }
        }
      }

      return output;
    },
    isToday: function() {
      let today = new Date();
      if (this.date.toDateString() === today.toDateString()) {
        return true;
      } else {
        return false;
      }
    },
    isYesterday: function() {
      let today = new Date();

      let todayStr = new Date(today).toDateString();
      let tmpStr = new Date(this.date).toDateString();

      if (new Date(todayStr) > new Date(tmpStr)) {
        return true;
      } else {
        return false;
      }
      // return true;
    },
    isWeekday: function () {
      if (this.weekday === 0 || this.weekday === 6) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // Where the data happens.
    async getPlants() {
      const response = await PlantService.fetchAllPlants();
      this.allPlants = response.data.plants;
    },
    // async getDayPlants() {
    //   const response = await PlantService.fetchDayPlants(this.fullDateStr);
    //   this.dayPlants = response.data;

    // },
    // async getWeekendPlants() {
    //   const tmpDay = this.date;
    //   const thisDay = this.date.getDate();
    //   if (this.weekday === 1) {
    //     tmpDay.setDate(thisDay - 1)
    //   }
    //   if (this.weekday === 5) {
    //     tmpDay.setDate(thisDay + 1);
    //   }
    //   let tmpDayStr = tmpDay.toDateString();
    //   const response = await PlantService.fetchDayPlants(tmpDayStr);
    //   this.weekendPlants = response.data;

    // },
    getDayDiff(data) {
      const baseDay = new Date(data);
      const now = baseDay.getTime();
      const thisDay = this.date.getTime();

      let dayDiffInMilli = Math.abs(thisDay - now);
      let dayDiff = Math.floor(dayDiffInMilli / (1000 * 60 * 60 * 24));

      return dayDiff;
    },
    async triggerUpdate(e) {
      e.preventDefault();
      await PlantService.updatePlant(e.target.dataset.id);
      this.updateText = `Watered ${e.target.dataset.name}`;
      this.getPlants();
    }
  },
  created() {
    this.getPlants();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3,
h4 {
  margin: 5px;
}

ul {
  margin-left: 4px;
}

.day-content {
  text-align: left;
  padding: 5px;
  background-color: #b2ef9b;
  height: calc(100% - 80px);
  border: 1px #000f08 solid;
}

.Sat, .Sun {
  background-color: #cb904d;
}

.day-header {
  background-color: #5f8869;
  padding: 7px;
  color: #594e36;
  height: 80px;
  margin: 0px;
  border: 1px #000f08 solid;
}

.day-name {
  /* color: #594e36; */
  text-decoration: underline;
  font-weight: bolder;
  font-size: 22px;
  font-family: "Give You Glory", Cursive, serif;
  font-weight: bolder;
}

.DayView {
  width: 170px;
  /* border: 1px solid black; */
  /* max-height: 400px;
        overflow: auto; */
}

.plant {
  margin-bottom: 6px;
}

.day-plant {
  color: black;
}

.weekend-plant {
  color: blue;
}

.overdue-plant {
  color: red;
}

.update-btn {
  padding: 0px;
  display: block;
}

.update-text {
  margin-top: 10px;
}
</style>
