<script setup>
import { ref, inject } from "vue";
const $helper = inject("$helper");

const building = ref(false);
</script>

<template>
  <v-row class="mt-2">
    <v-col cols="6">
      <v-btn color="primary">
        Building <v-icon end icon="mdi-check" size="x-large"></v-icon>
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn color="red">
        Life Building <v-icon end icon="mdi-close" size="x-large"></v-icon
      ></v-btn>
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
