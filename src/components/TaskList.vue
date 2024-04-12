<script setup lang="ts">
  import { useStore } from '../store';
  import { computed, onMounted, onUnmounted, ref } from 'vue';

  import { Task } from '../types/task';

  import CheckBox from './CheckBox.vue';

  const store = useStore();
  const tasks = computed(() => store.filteredTasks);
  const toggleTask = (task: Task) => {
    store.toggleTask(task.id);
  };
  const editedTask = ref('');

  const toggleDropdown = (task: Task) => {
    task.showDropdown = !task.showDropdown;
  };

  const removeTask = (task: Task) => {
    store.removeTask(task.id);
  };

  const deleteTask = (task: Task) => {
    removeTask(task);
    toggleDropdown(task);
  };

  const editTask = (task: Task) => {
    editedTask.value = task.description;
    task.isEditing = true;
    document.getElementById('task-edit')?.focus();
  };
  const saveEditedTask = (task: Task) => {
    task.description = editedTask.value;
    task.isEditing = false;
  };

  const shareTask = (task: Task) => {
    const payload = 'Estoy trabajando en esta tarea: ' + task.description;
    window.open(
      `https://api.whatsapp.com/send?phone=51946719547&text=${encodeURIComponent(payload)}`,
    );
  };

  const closeDropdownOnOutsideClick = (event: MouseEvent) => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (!(dropdown as HTMLElement).contains(event.target as Node)) {
        (dropdown.previousElementSibling as HTMLButtonElement).click();
      }
    });
  };

  onMounted(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', closeDropdownOnOutsideClick);
  });
</script>

<template>
  <section class="task-list-container">
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <div class="task-item-content">
        <CheckBox
          :description="task.description"
          :done="task.done"
          :is-editing="task.isEditing"
          @click.prevent="toggleTask(task)" />
        <template v-if="task.isEditing">
          <input
            id="task-edit"
            v-model="editedTask"
            autofocus
            class="task-edit"
            type="text"
            @keyup.enter="saveEditedTask(task)" />
        </template>
      </div>
      <div class="dropdown">
        <button class="dropdown-toggle" @click.stop="toggleDropdown(task)"
          >⚬⚬⚬</button
        >
        <div v-if="task.showDropdown" class="dropdown-menu">
          <button @click="editTask(task)">Editar</button>
          <button @click="deleteTask(task)">Eliminar</button>
          <button @click="shareTask(task)">Compartir por Whatsapp</button>
        </div>
      </div>
      <div class="task-options">
        <button @click="editTask(task)">✏️</button>
        <button @click="deleteTask(task)">🗑️</button>
        <button @click="shareTask(task)"
          ><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
            alt="Share on WhatsApp"
        /></button>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .done {
    text-decoration: line-through;
  }

  .task-list-container {
    display: flex;
    flex-direction: column;
    margin-top: -1rem;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    border-radius: 30px;
    background-color: var(--item-background-color);
    margin: 1rem;
    width: 95%;
    padding: 1rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .task-item-content {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .dropdown {
    position: relative;
  }

  .dropdown-toggle {
    background-color: var(--glow);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 12rem;
  }

  .dropdown-menu button {
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-menu button:hover {
    background-color: #ddd;
  }

  .task-edit {
    background-color: var(--glow);
    cursor: pointer;
    border-radius: 30px;
    padding: 0.5rem 1rem;
  }
  .task-options {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    .dropdown {
      display: none;
    }

    .task-options {
      display: flex;
      gap: 0.5rem;
    }

    .task-options button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .task-options button img {
      width: 24px;
    }
  }
</style>
