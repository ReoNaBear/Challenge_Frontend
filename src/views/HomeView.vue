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
            size="11vw"
            color="purple"
            class="absolute"
            style="top: 50%; left: 50%; transform: translate(-50%, -104%)"
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
          <QRReader @btn="btn" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { Geolocation } from "@capacitor/geolocation";
import recordsAPI from "./../apis/records";
import store from "./../store";
import { QRReader } from "@/components";

const tab = ref("Button");
const $q = useQuasar();
const latitude = ref("");
const longitude = ref("");
const position = ref("");
const workTime = computed(() => store.state.currentPunchData.workTime);
const offWorkTime = computed(() => store.state.currentPunchData.offWorkTime);
//
const duration = computed(() => store.state.currentPunchData.duration / 5.4);
//以顏色區分是否滿足出席條件
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

const btn = function (e) {
  if (e) {
    tab.value = "Button";
  }
};

onBeforeMount(() => {
  store.dispatch("fetchCurrentPunchData");
});
</script>
