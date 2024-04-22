<script setup lang="ts">
  import TaskContent from './TaskContent.vue';
  import { useStore } from '../store';
  const store = useStore();
  store.loadTasks();

  import { computed } from 'vue';
  const tasks = computed(() => store.filteredTasks);
</script>

<template>
  <section class="task-list-container">
    <TaskContent v-for="task in tasks" :key="task.id" :task="task">
    </TaskContent>
  </section>
</template>
<style scoped>
  .task-list-container {
    display: flex;
    flex-direction: column;
    margin-top: -1rem;
  }
</style>
