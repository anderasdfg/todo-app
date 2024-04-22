<script setup lang="ts">
  import AddTaskForm from '../components/AddTaskForm.vue';
  import Tasks from '../components/TaskList.vue';
  import TaskFilters from '../components/TaskFilters.vue';
  import TaskHeader from '../components/TaskHeader.vue';
</script>

<template>
  <div class="todo-container">
    <TaskHeader />
    <AddTaskForm />
    <Tasks class="scrolling" />
    <TaskFilters />
  </div>
</template>

<style scoped>
  .scrolling {
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    padding-bottom: 3rem;
  }
  @media only screen and (min-width: 768px) {
    .todo-container {
      display: flex;
      flex-direction: column;
      margin: 2rem 25%;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .todo-container {
      margin: 2rem 10%;
    }
  }
</style>
