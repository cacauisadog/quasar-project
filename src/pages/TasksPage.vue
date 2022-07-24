<template>
  <q-page>
    <h1>hi</h1>
    <q-list>
      <q-item-label>
        Task list
      </q-item-label>

      <div class="q-ma-md" v-if="isMounting">
        <div class="flex q-mb-md" v-for="n in 5" :key="n">
          <q-skeleton type="QCheckbox" class="q-mr-sm" />
          <q-skeleton type="text" :size="`${n * 3.8}%`" class="q-pa-sm" />
        </div>
      </div>
      <TaskItem v-for="item in taskItems" :key="item.id" v-bind="item" @updateStatus="updateStatus($event)" />
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import TaskItem from 'components/TaskItem.vue'
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'TasksPage',

  components: {
    TaskItem,
  },

  setup () {
    const taskItems = ref([])
    let isMounting = ref(false)

    onMounted(async () => {
      isMounting.value = true
      try {
        const res = await api.get('tasks')
        taskItems.value = res.data.tasks
        isMounting.value = false
      } catch (e) {
        console.error(e.message)
      }
    })

    return {
      isMounting,
      taskItems,
      async updateStatus (event) {
        const isDone = event.$event
        const taskId = event.id

        try {
          await api.patch(`tasks/${taskId}`, { isDone })
          let task = this.taskItems.find(t => t.id === taskId)
          task.isDone = isDone
        } catch (e) {
          console.error(e.message)
        }

      }
    }
  }
})
</script>