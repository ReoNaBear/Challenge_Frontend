<template>
  <div class="q-pa-md">
    <q-responsive :ratio="1">
      <qrcode-stream :key="_uid" @init="onInit" @decode="onDecode" />
    </q-responsive>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useQuasar } from "quasar";
import { QrcodeStream } from "vue-qrcode-reader";
import recordsAPI from "./../apis/records";
import store from "./../store";

const $q = useQuasar();
const emit = defineEmits(["btn"]);
const msg = ref("");
const errorMsg = ref("");
function onDecode(decodedString) {
  msg.value = decodedString;
  qrcodePunch(msg.value);
}

async function onInit(promise) {
  try {
    await promise;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      errorMsg.value = "No permission";
    } else if (error.name === "NotFoundError") {
      errorMsg.value = "No camera device";
    } else if (error.name === "NotSupportedError") {
      errorMsg.value = "No secure with https";
    } else if (error.name === "NotReadableError") {
      errorMsg.value = "Camera is already in use";
    } else if (error.name === "OverconstrainedError") {
      errorMsg.value = "No front camera device";
    } else if (error.name === "StreamApiNotSupportedError") {
      errorMsg.value = "Please change browser";
    }
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: errorMsg.value,
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
      emit("btn", true);
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
