<template>
  <div id="app">
    <div id="nav">
      <h1 class="plantlyfe-title">Plant Lyfe</h1>
      <router-link to="/">Home</router-link>|
      <router-link to="/plants">Plants</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view v-if="apiReady" />
    <div v-else>loading...</div>
  </div>
</template>

<script>
import PlantService from "@/services/PlantService";

export default {
  data() {
    return {
      apiReady: false
    };
  },
  methods: {
    // Where the data happens.
    async getPlants() {
      const response = await PlantService.fetchAllPlants();

      if (response.data) {
        this.apiReady = true;
      } else {
        setTimeout(this.getPlants(), 1000);
      }
    }
  },
  created() {
    this.getPlants();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Give+You+Glory&display=swap");

body {
  background-color: lightgrey;
}

button {
  margin: 5px;
  background-color: #b2ef9b;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
}

button:hover {
  cursor: pointer;
}

.plantlyfe-title {
  font-family: 'Give You Glory', Cursive, serif;
  color: #b2ef9b;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000f08;
}

#nav {
  padding: 30px;
  background-color: grey;
}

#nav a {
  font-weight: bold;
  color: #b2ef9b;
}

#nav a.router-link-exact-active {
  color: #f1fcf7;
}
</style>
