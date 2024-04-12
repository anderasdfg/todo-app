import { defineStore } from 'pinia';
import { Task } from '../types/task';

export const useStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    filteredTasks: [] as Task[],
  }),
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      this.filterAllTasks();
    },
    toggleTask(id: number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.done = !task.done;
        this.filterAllTasks();
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.filterAllTasks();
    },
    filterAllTasks() {
      this.sortTasks();
      this.filteredTasks = this.tasks;
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
  persist: {
    storage: localStorage,
  },
});
