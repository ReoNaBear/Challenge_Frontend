<template>
  <q-page class="q-pa-md vertical-middle">
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
        <q-tab-panel name="Button" class="column items-center no-scroll">
          <q-knob
            readonly
            v-model="value"
            :thickness="0.22"
            color="orange"
            track-color="orange-3"
            class="text-orange col col-xl-auto"
            size="50vw"
          >
          </q-knob>
          <q-list class="col col-xl-auto">
            <q-item>
              <q-item-section class="text-h4" style="font-size: 12vw"
                >今日打卡
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>上班</q-item-label>
                <q-item-label>07:56:02</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>下班</q-item-label>
                <q-item-label>15:56:02</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-btn
            round
            icon="fact_check"
            size="14vw"
            color="purple"
            class="absolute"
            style="top: 7.5%"
            @click="punch"
          />
        </q-tab-panel>
        <q-tab-panel name="QR-code">
          <div class="q-pa-md" style="width: 60%; margin: auto">
            <q-responsive :ratio="1">
              <qrcode-stream :key="_uid" @init="onInit" @decode="onDecode" />
            </q-responsive>
          </div>
          <div class="q-pa-md">請掃描QR code</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { QrcodeStream } from "vue-qrcode-reader";
import recordsAPI from "./../apis/records";

const tab = ref("Button");
const value = ref(50);
const $q = useQuasar();

async function punch() {
  try {
    const response = await recordsAPI.postPunchRecord();
    console.log(response);
    if (response.status === 200) {
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "成功打卡",
        timeout: 1000,
      });
    }
    return;
  } catch (error) {
    console.log(error);
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: "連線失敗，請連線管理員",
      timeout: 1000,
    });
  }
}

//QR code
const msg = ref("");
function onDecode(decodedString) {
  msg.value = decodedString;
}
async function onInit(promise) {
  try {
    const { capabilities } = await promise;
    console.log(capabilities);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("final");
  }
}
</script>
