<template>
  <div class="q-pa-md absolute-center" style="width: 85%">
    <q-card class="q-pa-md" style="max-height: 80%">
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
        <q-tab-panel name="Button" class="row items-center no-scroll">
          <q-knob
            readonly
            v-model="value"
            :thickness="0.22"
            color="orange"
            track-color="orange-3"
            class="text-orange col col-md-auto"
            size="50vw"
          >
          </q-knob>
          <q-list class="col col-md-auto">
            <q-item>
              <q-item-section class="text-h4">今日打卡</q-item-section>
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

          <!-- <q-btn
              round
              icon="map"
              size="12vw"
              color="purple"
              class="absolute-center"
            /> -->
        </q-tab-panel>
        <q-tab-panel name="QR-code">
          <div class="text-h4">QR code打卡</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HomeView",
  components: {},
  setup() {
    const tab = ref("Button");
    const value = ref(50);
    return {
      tab,
      value,
    };
  },
};
</script>
