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
    if (!this.oldPassword || !this.newPassword || !this.checkPassword) {
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "所有欄位都要填入",
        timeout: 1000,
      });
      return;
    }
    if (this.newPassword !== this.checkPassword) {
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "兩次輸入的密碼不一致",
        timeout: 1000,
      });
      return;
    }
    const response = await usersAPI.putPassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });
    const { data } = response;
    if (data.status === "success") {
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "密碼修改成功",
        timeout: 1000,
      });
      router.push({ path: "/dashboard", replace: true });
      return;
    } else {
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: "發生錯誤，請聯繫管理員",
        timeout: 1000,
      });
    }
  } catch (error) {
    console.log(error);
    this.newPassword = "";
    this.oldPassword = "";
    this.checkPassword = "";
    $q.notify({
      progress: true,
      position: "top",
      type: "negative",
      message: "密碼錯誤，請在填一次",
      timeout: 1000,
    });
  }
}
</script>
