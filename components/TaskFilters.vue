<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '../store/index';

  const store = useStore();

  const pendingCount = computed(() => {
    return store.filteredTasks.filter((task) => !task.done).length;
  });

  const filterTasks = (filterType: string) => {
    switch (filterType) {
      case 'all':
        store.filterAllTasks();
        break;
      case 'completed':
        store.filterCompletedTasks();
        break;
      case 'pending':
        store.filterPendingTasks();
        break;
      default:
        break;
    }
  };
</script>

<template>
  <div class="bottom-container">
    <div class="task-filters">
      <div class="pending-count">⏳ {{ pendingCount }} tareas pendientes</div>
      <div class="button-filters">
        <button @click="filterTasks('all')">Todos</button>
        <button @click="filterTasks('completed')">Completados</button>
        <button @click="filterTasks('pending')">Pendientes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bottom-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.1);
    padding-top: 1rem;
    left: 0;
  }
  .task-filters {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-around;
    align-items: center;
  }

  .button-filters {
    display: flex;
    gap: 1rem;
  }

  .button-filters button {
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  .button-filters button:first-child {
    background-color: #aedefc;
  }

  .button-filters button:nth-child(2n) {
    background-color: #a5dd9b;
  }

  .button-filters button:last-child {
    background-color: #fff3c7;
  }

  .button-filters button:focus {
    outline: none;
    transform: scale(1.05);
    font-weight: bold;
    box-shadow: 0 0 0 1px lightgray;
    background-color: var(--glow);
  }

  .button-filters button:hover {
    background-color: var(--glow);
  }

  .pending-count {
    font-size: 0.7rem;
  }

  @media only screen and (min-width: 768px) {
    .bottom-container {
      padding-left: 20%;
      padding-right: 20%;
    }
  }
</style>
