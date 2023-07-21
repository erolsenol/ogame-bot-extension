<script setup>
import { ref, inject } from "vue";
const $helper = inject("$helper");

const building = ref(false);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-checkbox
        v-model="building"
        label="primary"
        color="primary"
      ></v-checkbox>
      Building
      <v-checkbox label="Checkbox"></v-checkbox>
    </v-col>
  </v-row>
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
