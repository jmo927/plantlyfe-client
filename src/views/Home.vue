<template>
  <div class="home">
    <div class="content-row">
      <button
        class="carousel-btn car-back"
        data-move="back"
        v-on:click="checkCarousel"
        v-if="!atFirstCar"
      >Back</button>
      <h1 class="site-title">Plant Watering Schedule</h1>
      <button
        class="carousel-btn car-next"
        data-move="next"
        v-on:click="checkCarousel"
        v-if="!atLastCar"
      >Next</button>
    </div>
    <WeekView v-if="isBuilt" :weekInfo="weeks[pageWeek]" :weekCount="pageWeek" />
  </div>
</template>

<script>
import WeekView from "@/components/WeekView.vue";

export default {
  name: "home",
  components: {
    WeekView
  },
  data() {
    return {
      today: new Date(),
      weeks: [],
      pageWeek: 0,
      atFirstCar: true,
      atLastCar: false,
      isBuilt: false,
    };
  },
  mounted() {
    this.fireItUp();
  },
  methods: {
    buildAnotherWeek() {
      const w = this.weeks;
      const wL = w.length - 1;
      const lastWeek = w[wL];
      // sets newDay as Last Day of Last Week
      const lastDay = lastWeek[lastWeek.length - 1];
      const newDay = new Date(lastDay);
      // adjusts newDay to be day after Last Day
      newDay.setDate(newDay.getDate() + 1);

      let newWeek = [];
      // add 7 days worth of Date objs.
      for (let i = 0; i < 7; i++) {
        let next = new Date(newDay);
        next.setDate(next.getDate() + i);
        newWeek.push(next);
      }

      // Build out the full 12 weeks
      if (wL < 11) {
        w.push(newWeek);
        this.buildAnotherWeek();
      } else if (wL === 11) {
        this.isBuilt = true;
      }
      return w;
    },
    buildWeekOne() {
      const day = this.today;
      let week = [-1, -1, -1, -1, -1, -1, -1]; // u, m, t, w, r, f, s

      const tmpDay = day.getDay();

      let adder = 0;

      // let's build a week
      for (let i = tmpDay; i < week.length; i++) {
        let next = new Date();
        next.setDate(next.getDate() + adder);
        week[i] = next;
        adder++;
      }

      if (tmpDay > 0) {
        adder = 0;
        for (let i = tmpDay; i > -1; i--) {
          let prev = new Date();
          prev.setDate(prev.getDate() - adder);
          week[i] = prev;
          adder++;
        }
      }
      return week;
    },
    checkCarousel(e) {
      const move = e.target.dataset.move;
      // check page of carousel
      if (move === "next") {
        if (this.pageWeek < 11) {
          this.pageWeek++;
        }
      } else {
        if (this.pageWeek > 0) {
          this.pageWeek--;
        }
      }

      // update buttons via psuedo-state.
      if (this.pageWeek === 0) {
        this.atFirstCar = true;
        this.atLastCar = false;
      } else if (this.pageWeek > 0 && this.pageWeek < 11) {
        this.atFirstCar = false;
        this.atLastCar = false;
      } else if (this.pageWeek === 11) {
        this.atFirstCar = false;
        this.atLastCar = true;
      }

      this.thisWeek = this.weeks[this.pageWeek];
    },
    async fireItUp() {
      // There has to be a better way than this, but testing seems to have other plans.

      const output = this.buildWeekOne();
      this.weeks.push(output);
      this.buildAnotherWeek();
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Give+You+Glory&display=swap');

h1 {
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
}

.content-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.site-title {
  font-family: "Give You Glory", Cursive, serif;
}
</style>
