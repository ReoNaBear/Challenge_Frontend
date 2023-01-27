<template>
  <div class="q-pa-md absolute-center" style="width: 85%">
    <q-card class="q-pa-md fit flex">
      <q-form @submit.stop.prevent="submit()" class="fit">
        <BaseInput v-bind="props.account" v-model="account" />
        <BaseInput v-bind="props.password" v-model="password" />
        <q-btn
          class="full-width"
          color="indigo-3"
          label="Login"
          type="submit"
        />
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import authorizationAPI from "../apis/authorization";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { BaseInput } from "@/components";

const $q = useQuasar();
const router = useRouter();
const store = useStore();
const account = ref("");
const password = ref("");

const props = {
  account: {
    label: "account",
    dense: false,
    icon: "person",
  },
  password: {
    label: "password",
    dense: false,
    icon: "password",
    type: "password",
  },
};

async function submit() {
  try {
    $q.loading.show();
    if (!account.value || !password.value) {
      $q.loading.hide();
      $q.notify({
        progress: true,
        position: "top",
        type: "warning",
        message: "All Fields Are Required!",
        timeout: 1000,
      });
      return;
    }
    const response = await authorizationAPI.signIn({
      account: account.value,
      password: password.value,
    });
    const { data } = response;
    const statue = data.status;
    const result = data.data;
    if (statue !== "success") {
      throw new Error(data.message);
    }
    if (result.user.isBanned === "1") {
      throw new Error(data.message);
    }
    localStorage.setItem("token", result.token);
    store.commit("setCurrentUser", result.user);
    $q.loading.hide();
    if (result.user.isAdmin === 0) {
      router.push({ path: "/dashboard", replace: true });
    } else {
      router.push({ path: "/admin", replace: true });
    }
    $q.notify({
      progress: true,
      position: "top",
      type: "positive",
      message: `Hi ${result.user.userName} Welcome Back`,
      timeout: 1000,
    });
    return;
  } catch (error) {
    $q.loading.hide();
    password.value = "";
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
<style></style>
