<script setup>
import { ref, inject, computed } from "vue";
import { initGamePlayStatus } from "../constant";

const $helper = inject("$helper");
console.log("$helper",$helper);
const gamePlayStatus = ref(
  $helper.StorageGetInitialize("gamePlayStatus", initGamePlayStatus)
);
console.log("gamePlayStatus", gamePlayStatus.value);

const producers = computed(() => gamePlayStatus.value.producers.status);
const lfbuildings = computed(() => gamePlayStatus.value.lfbuildings.status);
const facilities = computed(() => gamePlayStatus.value.facilities.status);
const research = computed(() => gamePlayStatus.value.research.status);
const shipyard = computed(() => gamePlayStatus.value.shipyard.status);
const defense = computed(() => gamePlayStatus.value.defense.status);
const discovery = computed(() => gamePlayStatus.value.discovery.status);
const attack = computed(() => gamePlayStatus.value.attack.status);
</script>

<template>
  <v-row class="mt-2">
    <v-col cols="6">
      <v-btn color="primary">
        Building
        <v-icon
          end
          :icon="`mdi-${producers ? 'check' : 'close'}`"
          size="x-large"
        ></v-icon>
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn color="red">
        Life Building <v-icon end icon="mdi-close" size="x-large"></v-icon
      ></v-btn>
    </v-col>
  </v-row>
</template>

<style></style>
