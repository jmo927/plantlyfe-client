<template>
  <div class="week-view">
    <div class="legend-info">
      <span class="today-txt-key">Plants Scheduled for Today</span> |
      <span class="overdue-txt-key">Plants Overdue for Watering</span> |
      <span class="weekend-txt-key">Plants Originally Scheduled on Weekend</span>
    </div>

    <div class="week-header">
      <h2 class="week-title">Week {{weekCount + 1}}</h2>
      <h3>
        <span class="week-start">{{ weekStart }}</span> -
        <span class="week-end">{{ weekEnd }}</span>
      </h3>
    </div>
    <div class="week-content">
      <DayView
        v-for="(day, idx) in weekInfo"
        :key="idx * (weekCount +1)"
        :date="day"
        :weekday="idx"
      />
    </div>
  </div>
</template>

<script>
import DayView from "@/components/DayView.vue";

export default {
  name: "WeekView",
  components: {
    DayView
  },
  props: {
    weekInfo: Array,
    weekCount: Number
  },
  computed: {
    weekStart: function() {
      return this.weekInfo[0].toDateString();
    },
    weekEnd: function() {
      return this.weekInfo[6].toDateString();
    }
  },
  // mounted() {
  //   // stuff
  // }
  // methods: {
  //   buildWeek() {
  //       //stuff
  //   },
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.week-content {
  display: flex;
  justify-content: space-evenly;
}

.today-txt-key {
  color: black;
}

.overdue-txt-key {
  color: red;
}

.weekend-txt-key {
  color: blue;
}
</style>
