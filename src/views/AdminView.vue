<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-table :columns="columns" :rows="users" row-key="userName" :key="key">
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="q-gutter-sm">
            <template v-if="props.row.isAdmin === 0">
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
            </template>
          </q-td>
          <q-dialog v-model="info" full-height full-width>
            <q-card class="column full-width full-height">
              <q-card-section>
                <div class="text-h6">基本資料</div>
              </q-card-section>
              <div class="q-pa-md">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>姓名</q-item-label>
                      <q-item-label>{{ targetUser.row.userName }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section>
                      <q-item-label>工號</q-item-label>
                      <q-item-label>{{ targetUser.row.empNo }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section>
                      <q-item-label>Email</q-item-label>
                      <q-item-label>{{
                        targetUser.row.userEmail
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item v-if="targetUser.row.isAdmin === 0">
                    <q-item-section>
                      <q-item-label>本月缺席次數</q-item-label>
                      <q-item-label>{{
                        targetUser.noneAttendDays
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section>
                      <q-item-label>變更密碼</q-item-label>
                      <q-item-label></q-item-label>
                      <BaseInput v-bind="prop.password" v-model="password" />
                    </q-item-section>

                    <q-item-section side>
                      <q-btn
                        square
                        color="brown-5"
                        icon="directions"
                        @click="changePassword(targetUser.row.userId)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
        <template v-slot:body-cell-info="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn size="sm" round icon="info" @click="openDialog(props)" />
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
import { BaseInput } from "@/components";

const $q = useQuasar();
const password = ref("");

const prop = {
  password: {
    label: "更改密碼",
    dense: false,
    icon: "password",
    type: "password",
  },
};

const columns = [
  {
    name: "info",
    align: "center",
    label: "細節",
    field: "info",
  },
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
const preDate = ref("");
const info = ref(false);
let users = [];

async function getUsers() {
  try {
    key.value = 0;
    $q.loading.show();
    const response = await adminsAPI.getUsers();
    const data = response.data.data.users;
    preDate.value = response.data.data.date;
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
    let date = preDate.value;
    $q.loading.show();
    const response = await adminsAPI.updatePunchStatus(userId, status, date);
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

async function changePassword(userId) {
  try {
    $q.loading.show();
    if (!password.value) {
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
    const response = await adminsAPI.putPassword({
      userId: userId,
      newPassword: password.value,
    });
    const { data } = response;
    if (data.status === "success") {
      $q.loading.hide();
      password.value = "";
      $q.notify({
        progress: true,
        position: "top",
        type: "positive",
        message: "Action Success!",
        timeout: 1000,
      });
      return;
    }
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

let targetUser = null;

async function openDialog(props) {
  try {
    targetUser = props;
    const response = await adminsAPI.getMonthRecord(props.row.userId);
    if (response.status === 200) {
      info.value = true;
      targetUser.noneAttendDays = response.data.data.noneAttendDays;
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

onBeforeMount(() => {
  getUsers();
});
</script>
