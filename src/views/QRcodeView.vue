<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <qrcode-vue :value="value" size="250"></qrcode-vue>
      <q-btn
        class="full-width"
        color="indigo-3"
        label="renew"
        @click="getQRcode()"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import QrcodeVue from "qrcode.vue";
import adminsAPI from "../apis/admins";

const $q = useQuasar();
let value = ref("");
let timer = "";
let newValue = "";

onBeforeMount(() => {
  getQRcode();
  timer = setInterval(() => {
    getQRcode();
  }, 10000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

async function getQRcode() {
  try {
    $q.loading.show();
    const response = await adminsAPI.getQRcode();
    newValue = response.data.data.QRcodeSecret;
    if (value.value !== newValue) {
      value.value = newValue;
    }
    $q.loading.hide();
    return;
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: "System Error! Please Contact Administrator",
      timeout: 1000,
    });
  }
}
</script>
