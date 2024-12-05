<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Brush and Battle </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
const text = ref(""); // Define 'text' to use it with v-model in <q-input>

defineOptions({
  name: "MiniLayout",
});
</script>

<style></style>
