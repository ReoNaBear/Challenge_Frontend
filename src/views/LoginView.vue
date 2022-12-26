<template>
  <div class="q-pa-md absolute-center" style="width: 85%">
    <q-card class="q-pa-md fit flex">
      <q-form @submit="onSubmit" @reset="onReset" class="fit">
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
        <q-btn class="full-width" color="indigo-3" label="Login" />
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from "vue";

const account = ref("");
const password = ref("");
const dense = ref(false);
</script>
<style></style>
