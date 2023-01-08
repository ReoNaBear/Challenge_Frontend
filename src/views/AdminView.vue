<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-table :columns="columns" :rows="users" row-key="userName" :key="key">
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn
              v-if="props.row.isBanned === 0"
              size="sm"
              round
              color="secondary"
              icon="link"
              @click="changeBannedStatus(props.row.userId, false)"
            />
            <q-btn
              v-else
              round
              size="sm"
              color="red"
              icon="link_off"
              @click="changeBannedStatus(props.row.userId, true)"
            />
            <q-btn
              v-if="props.row.status === 0"
              size="sm"
              round
              color="red"
              icon="cancel"
              @click="changePunchStatus(props.row.userId, true)"
            />
            <q-btn
              v-else
              round
              size="sm"
              color="secondary"
              icon="check_circle"
              @click="changePunchStatus(props.row.userId, false)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import adminsAPI from "../apis/admins";
import { onBeforeMount, ref } from "vue";
const $q = useQuasar();

const columns = [
  {
    name: "empNo",
    label: "工號",
    align: "center",
    field: "empNo",
    sortable: true,
  },
  {
    name: "userName",
    align: "center",
    label: "姓名",
    field: "userName",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "封鎖/打卡",
  },
];
const key = ref(0);
let users = [];

async function getUsers() {
  try {
    key.value = 0;
    $q.loading.show();
    const response = await adminsAPI.getUsers();
    const data = response.data.data;
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].presentRecord !== null) {
        data[i].status = data[i].presentRecord.status;
      } else {
        data[i].status = 0;
      }
      newData.push(data[i]);
    }
    users = newData;
    key.value = 1;
    $q.loading.hide();
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

async function changeBannedStatus(userId, status) {
  try {
    $q.loading.show();
    const response = await adminsAPI.updateBannedStatus(userId, status);
    console.log(response);
    if (response.status === 200) {
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
    }
    getUsers();
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

async function changePunchStatus(userId, status) {
  try {
    let date = "2023-01-07";
    $q.loading.show();
    const response = await adminsAPI.updatePunchStatus(userId, status, date);
    console.log(response);
    if (response.status === 200) {
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
    }
    getUsers();
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

onBeforeMount(() => {
  getUsers();
});
</script>
