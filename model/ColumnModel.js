import { Observable } from "../js/Observable.js";

export class ColumnModel extends Observable {
  constructor({id, title}) {
    super();
    this.id = id;
    this.title = title;
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
    this.notify(this.tasks);
  }
  removeTask(target) {
    this.tasks = this.tasks.filter(task => task !== target);
    this.notify(this.tasks);
  }
  async getData() {
    // 서버에서 해당 column의 task목록 가져옴
    const res = await fetch(`http://localhost:3000/task?columnId=${this.id}`);
    this.tasks = await res.json();
    this.notify(this.tasks);
  }
  async setData(task) {
    // 서버에 해당 column에 task 추가
  }
}