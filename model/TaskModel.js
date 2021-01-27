import { Observable } from "../js/Observable.js";

export class TaskModel extends Observable {
  constructor() {
    super();
    this.tasks = [];
  }
  postTask(...tasks) {
    this.tasks = [...this.tasks, ...tasks];
    this.notify(this.tasks);
  }
  deleteTask(id) {}
}