<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="background-color text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="absolute"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <div>泰坦打卡</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="q-mini-drawer-hide"
      side="left"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered elevated class="background-color text-white">
      <q-tabs v-model="tab" class="text-white" align="justify">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(true);
const tab = ref("mails");

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.background-color {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
</style>
