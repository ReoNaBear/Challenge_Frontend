<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="background-color text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>泰坦打卡</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      v-if="isAuth"
      bordered
      elevated
      class="background-color text-white"
    >
      <q-tabs
        v-if="isAdmin === 0"
        v-model="tab"
        class="text-white"
        align="justify"
      >
        <q-route-tab name="home" icon="home" label="主頁" to="/dashboard" />
        <q-route-tab
          name="settings"
          icon="settings"
          label="設定"
          to="/settings"
        />
        <q-btn
          icon="logout"
          auto-close
          stretch
          flat
          label="登出"
          @click="logout()"
        />
      </q-tabs>
      <q-tabs v-else v-model="tab" class="text-white" align="justify">
        <q-route-tab name="home" icon="home" label="主頁" to="/admin" />
        <q-route-tab
          name="qrcode"
          icon="qr_code_2"
          label="QRcode"
          to="/qrcode"
        />
        <q-btn
          icon="logout"
          auto-close
          stretch
          flat
          label="登出"
          @click="logout()"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import stores from "./store";

const isAuth = computed(() => stores.state.isAuthenticated);
const isAdmin = computed(() => stores.state.currentUser.isAdmin);
const store = useStore();
const router = useRouter();
const tab = ref("home");
const $q = useQuasar();

if (stores.state.isAuthenticated) {
  isAuth.value = true;
}

function logout() {
  $q.dialog({
    title: "Confirm",
    message: "Logout Anyway?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    store.commit("revokeAuthentication");
    router.push({ path: "/login", replace: true });
    $q.notify({
      progress: true,
      position: "top",
      type: "positive",
      message: "Logout Success",
      timeout: 1000,
    });
  });
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
