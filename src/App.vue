<script setup>
import { ref } from "vue";
import General from "./components/General.vue"
import Building from "./components/Building.vue"

const menuItems = ["General", "Building", "Research","Defence"];

const tabValue = ref("general");

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
</script>

<template>
  <v-container fluid style="padding: 0">
    <v-card style="border-radius: 0">
      <v-tabs v-model="tabValue" bg-color="deep-purple-darken-4" center-active>
        <v-tab v-for="(item, key) in menuItems" :key="key" :value="item">{{
          item
        }}</v-tab>
      </v-tabs>
    </v-card>
    <v-window v-model="tabValue">
      <v-window-item v-for="item in menuItems" :key="item" :value="item">
        <General v-if="tabValue == 'General'" />
        <Building v-else-if="tabValue == 'Building'" />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 400px;
  min-height: 500px;
}
</style>
