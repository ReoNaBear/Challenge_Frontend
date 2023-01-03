<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form @submit.stop.prevent="changePassword()" class="fit">
        <q-input
          type="password"
          v-model="oldPassword"
          label="原本的密碼"
          :dense="dense"
          class="q-pb-md"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="oldPassword = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-input
          type="password"
          v-model="newPassword"
          label="新的密碼"
          :dense="dense"
          class="q-pb-md"
        >
          <template v-slot:prepend>
            <q-icon name="check" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="newPassword = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-input
          type="password"
          v-model="checkPassword"
          label="確認密碼"
          :dense="dense"
          class="q-pb-md"
        >
          <template v-slot:prepend>
            <q-icon name="done_all" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="checkPassword = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import usersAPI from "./../apis/users";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const checkPassword = ref("");
const dense = ref(false);

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
