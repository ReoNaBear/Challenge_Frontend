<template>
  <div class="q-pa-md absolute-center" style="width: 85%">
    <q-card class="q-pa-md fit flex">
      <q-form @submit.stop.prevent="submit()" class="fit">
        <q-input
          v-model="account"
          label="account"
          :dense="dense"
          class="q-pb-md"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="account = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          type="password"
          v-model="password"
          label="password"
          :dense="dense"
          class="q-pb-md"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="password = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
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
import { Toast } from "./../utils/helpers";
import authorizationAPI from "../apis/authorization";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const account = ref("");
const password = ref("");
const dense = ref(false);

async function submit() {
  try {
    if (!this.account || !this.password) {
      Toast.fire({
        icon: "warning",
        title: "請填入帳號和密碼",
      });
      return;
    }
    const response = await authorizationAPI.signIn({
      account: this.account,
      password: this.password,
    });
    const { data } = response;
    const statue = data.status;
    const result = data.data;
    console.log(data);
    if (statue !== "success") {
      throw new Error(data.message);
    }
    if (result.user.isBanned === "1") {
      throw new Error(data.message);
    }
    localStorage.setItem("token", result.token);
    store.commit("setCurrentUser", result.user);
    router.push({ path: "/dashboard", replace: true });
    Toast.fire({
      icon: "success",
      title: `Hi ${result.user.userName} 歡迎回來`,
    });
    return;
  } catch (error) {
    console.log(error);
    this.password = "";
    Toast.fire({
      icon: "warning",
      title: "帳號或密碼有誤",
    });
  }
}
</script>
<style></style>
