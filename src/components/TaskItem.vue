<script setup lang="ts">
  import { ref } from 'vue';
  import { Task } from '../types/task';
  import { useStore } from '../store';

  const store = useStore();
  const task = ref<Task>({
    id: 0,
    description: '',
    done: false,
    createdAt: new Date(),
    showDropdown: false,
    isEditing: false,
  });

  const addTask = () => {
    if (task.value.description.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        description: task.value.description.trim(),
        done: false,
        createdAt: new Date(),
        showDropdown: false,
        isEditing: false,
      };
      store.addTask(newTask);
      task.value.description = '';
    }
  };
</script>

<template>
  <section class="task-item-container">
    <div class="task-item-add">
      <input
        id="content"
        v-model="task.description"
        type="text"
        name="content"
        placeholder="☁️ Hacer una to-do..."
        @keyup.enter="addTask" />
      <button type="button" @click="addTask">
        <span class="show-mobile">➕ </span>
        <span class="show-desktop">Agregar</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
  .task-item-container {
    display: flex;
    flex-direction: column;
  }
  .task-item-add {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .completed {
    text-decoration: line-through;
  }

  input:not([type='radio']):not([type='checkbox']) {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: initial;
  }

  .task-item-add input {
    width: 70%;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    color: var(--dark);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1.5rem;
  }

  .task-item-add button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    font-size: 1rem;
    height: 100%;
    padding: 1rem 1.5rem;
    color: var(--dark);
    background-color: var(--glow);
    border-radius: 0.5rem;
    box-shadow: var(--primary);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    border: none;
    outline: none;
  }

  .show-mobile {
    display: inline;
  }

  .show-desktop {
    display: none;
  }

  @media only screen and (min-width: 800px) {
    .show-desktop {
      display: inline;
    }
  }
</style>
