<template>
  <div class="plants">
    <h1 class="plants-title">List of Office Plants</h1>
    <p>Here's a list of all the plants in the office. Remove the dead weight, add some fresh blood, and generally check on the status of your plants.</p>
    <div class="plant-wrap">
      <div class="plant-card" v-for="(plant, index) in plants" :key="index">
        <h3>{{ plant.name }}</h3>
        <p>Water every {{ plant.waterAfter }} days</p>
        <p>Last watered: {{ plant.lastWater }}</p>
        <button :data-id="plant._id" v-on:click="deletePlant">Delete</button>
      </div>
    </div>
    <div class="add-plant">
      <h2>Add A New Plant</h2>
      <label for="name">New Plant Name</label>
      <br />
      <input name="name" type="text" placeholder="Plant Name" v-model="newPlantName" />
      <br />
      <br />
      <label for="water-after">Water After How Many Days?</label>
      <br />
      <input name="water-after" type="text" placeholder="1" v-model="newPlantWater" />
      <br />
      <button class="submit-btn" @click="addPlant">Submit</button>
    </div>
  </div>
</template>

<script>
import PlantService from "@/services/PlantService";

export default {
  name: "plants",
  data() {
    return {
      plants: [],
      newPlantName: "",
      newPlantWater: -1
    };
  },
  computed: {
    newPlantLastWater: function() {
      const today = new Date();
      return today.toDateString();
    }
  },
  mounted() {
    this.getPlants();
  },
  methods: {
    async getPlants() {
      const response = await PlantService.fetchAllPlants();
      this.plants = response.data.plants;
    },
    async addPlant() {
      let data = {
        name: this.newPlantName,
        waterAfter: +this.newPlantWater,
        lastWater: this.newPlantLastWater
      };

      if (isNaN(data.waterAfter)) {
        console.log("try again");
      } else {
        const response = await PlantService.addPlant(data);
        console.log(response.data);
      }

      this.newPlantName = "";
      this.newPlantWater = 1;
      this.getPlants();
    },
    async deletePlant(e) {
      console.log(e.target.dataset.id);
      const response = await PlantService.deletePlant(e.target.dataset.id);
      console.log(response);
      this.getPlants();
    }
  }
};
</script>

<style scoped>

.add-plant {
  border: 1px black solid;
  background-color: grey;
  margin: 25px;
  padding: 15px;
}

.plant-card {
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
}

.plants-title {
  font-family: "Give You Glory", cursive, serif;
}

.plant-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
}
</style>