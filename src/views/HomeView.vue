<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Button" label="Button" />
        <q-tab name="QR-code" label="QR code" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Button" class="no-scroll">
          <q-knob
            readonly
            v-model="duration"
            :thickness="0.22"
            :color="color"
            track-color="orange-3"
            class=""
            size="40vw"
          >
          </q-knob>
          <q-btn
            round
            icon="fact_check"
            size="10.5vw"
            color="purple"
            class="absolute"
            style="top: 50%; left: 50%; transform: translate(-50%, -107%)"
            @click="punch"
          />
          <q-list class="" style="font-size: 4vw; top: 18%">
            <div style="font-size: 8vw">今日打卡</div>
            <div>上班</div>
            <div>{{ workTime }}</div>
            <div>下班</div>
            <div>{{ offWorkTime }}</div>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="QR-code">
          <div class="q-pa-md" style="width: 60%; margin: auto">
            <q-responsive :ratio="1">
              <qrcode-stream :key="_uid" @init="onInit" @decode="onDecode" />
            </q-responsive>
          </div>
          <div class="q-pa-md" style="font-size: 4vw">請掃描QR code</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { QrcodeStream } from "vue-qrcode-reader";
import { Geolocation } from "@capacitor/geolocation";
import recordsAPI from "./../apis/records";
import store from "./../store";

const tab = ref("Button");
const $q = useQuasar();
const latitude = ref("");
const longitude = ref("");
const position = ref("");
const workTime = computed(() => store.state.currentPunchData.workTime);
const offWorkTime = computed(() => store.state.currentPunchData.offWorkTime);
const duration = computed(() => store.state.currentPunchData.duration / 5.4);
const color = computed(() => {
  if (duration.value >= 100) {
    return "green";
  } else if (duration.value >= 50) {
    return "orange";
  } else {
    return "red";
  }
});

function getCurrentPosition() {
  Geolocation.getCurrentPosition().then((newPosition) => {
    position.value = newPosition;
  });
  latitude.value = position.value.coords.latitude;
  longitude.value = position.value.coords.longitude;
}

async function punch() {
  try {
    $q.loading.show();
    await getCurrentPosition();
    const response = await recordsAPI.postPunchRecord({
      latitude: latitude.value,
      longitude: longitude.value,
    });
    if (response.status === 200) {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
      store.dispatch("fetchCurrentPunchData");
    }
    return;
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: `${error.response.data.message}`,
      timeout: 1000,
    });
  }
}

//QR code
const msg = ref("");

function onDecode(decodedString) {
  msg.value = decodedString;
  qrcodePunch(msg.value);
}

async function onInit(promise) {
  try {
    const { capabilities } = await promise;
    console.log(capabilities);
  } catch (error) {
    console.log(error);
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: "Something Wrong! Please Contact Administrator",
      timeout: 1000,
    });
  } finally {
    console.log("final");
  }
}

async function qrcodePunch(secretCode) {
  try {
    $q.loading.show();
    const response = await recordsAPI.qrcodePunchRecord({
      secretCode: secretCode,
    });
    if (response.status === 200) {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
      store.dispatch("fetchCurrentPunchData");
      tab.value = "Button";
    }
    return true;
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: `${error.response.data.message}`,
      timeout: 1000,
    });
  }
}
</script>
