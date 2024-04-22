import { defineStore } from 'pinia';
import { Task } from '../types/task';

export const useStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    filteredTasks: [] as Task[],
  }),
  actions: {
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
        this.filterAllTasks();
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    created() {
      this.loadTasks();
    },
    beforeUnmount() {
      this.saveTasks();
    },
    addTask(task: Task) {
      this.tasks.push(task);
      this.filterAllTasks();
      this.saveTasks();
    },
    toggleTask(id: number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.done = !task.done;
        this.filterAllTasks();
        this.saveTasks();
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.filterAllTasks();
      this.saveTasks();
    },
    filterAllTasks() {
      this.sortTasks();
      this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
    },
    sortTasks() {
      this.tasks.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    },
    filterPendingTasks() {
      this.sortTasks();
      this.filteredTasks = this.tasks.filter((task) => !task.done);
    },
    filterCompletedTasks() {
      this.sortTasks();
      this.filteredTasks = this.tasks.filter((task) => task.done);
    },
  },
});
