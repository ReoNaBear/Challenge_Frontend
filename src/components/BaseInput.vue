<template>
  <q-input
    v-model="value"
    :label="props.label"
    :dense="props.dense"
    :type="props.type"
    class="q-pb-md"
  >
    <template v-slot:prepend>
      <q-icon :name="props.icon" />
    </template>
  </q-input>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: { type: String, default: "", required: true },
  dense: { type: Boolean, default: false },
  icon: { type: String, default: "" },
  type: { type: String, default: "" },
});
</script>
