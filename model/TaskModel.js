import { Observable } from "../js/Observable.js";

export class TaskModel extends Observable {
  constructor() {
    super();
    this.tasks = [];
  }
  addTask(...tasks) {
    this.tasks = [...this.tasks, ...tasks];
    this.notify(this.tasks);
  }
  removeColumn(id) {}
}