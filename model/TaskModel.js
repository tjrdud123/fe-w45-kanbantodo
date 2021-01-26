import { Observable } from "../js/Observable.js";

export class TaskModel extends Observable {
  constructor({id, columnId, title}) {
    this.id = id;
    this.columnId = columnId;
    this.title = title;
    this.subTasks = [];
  }
}