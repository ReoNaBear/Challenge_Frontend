<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit.stop.prevent="changePassword()" class="fit">
        <BaseInput v-bind="props.oldPassword" v-model="oldPassword" />
        <BaseInput v-bind="props.newPassword" v-model="newPassword" />
        <BaseInput v-bind="props.checkPassword" v-model="checkPassword" />
        <q-btn
          class="full-width"
          color="indigo-3"
          label="更改密碼"
          type="submit"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { BaseInput } from "@/components";
import { ref } from "vue";
import { useQuasar } from "quasar";
import usersAPI from "./../apis/users";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const checkPassword = ref("");

const props = {
  oldPassword: {
    label: "原本密碼",
    dense: false,
    icon: "password",
    type: "password",
  },
  newPassword: {
    label: "新的密碼",
    dense: false,
    icon: "check",
    type: "password",
  },
  checkPassword: {
    label: "確認密碼",
    dense: false,
    icon: "done_all",
    type: "password",
  },
};

async function changePassword() {
  try {
    $q.loading.show();
    if (!oldPassword.value || !newPassword.value || !checkPassword.value) {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "All Fields Are Required!",
        timeout: 1000,
      });
      return;
    }
    if (newPassword.value !== checkPassword.value) {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "Please Check Your New Password Again",
        timeout: 1000,
      });
      return;
    }
    const response = await usersAPI.putPassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    const { data } = response;
    if (data.status === "success") {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
      router.push({ path: "/dashboard", replace: true });
      return;
    } else {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "System Error! Please Contact Administrator",
        timeout: 1000,
      });
    }
  } catch (error) {
    $q.loading.hide();
    newPassword.value = "";
    oldPassword.value = "";
    checkPassword.value = "";
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
