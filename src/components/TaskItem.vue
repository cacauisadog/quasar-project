<template>
  <q-item>
    <q-item-section>
      <q-checkbox :model-value="isDone" @update:model-value="$emit('updateStatus', { $event, id })" :label="text" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    isDone: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      default: ''
    }
  },
})
</script>