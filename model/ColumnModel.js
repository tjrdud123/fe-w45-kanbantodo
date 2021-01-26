import { Observable } from "../js/Observable.js";

class ColumnModel extends Observable {
  constructor(title) {
    super();
    this.title = title;
    this.tasks = [];
  }
  async getData() {
    // 서버에서 해당 column의 task목록 가져옴


    this.notify(this.tasks);
  }
  async setData() {
    // 서버에 데이터 전송
  }
  addTask(task) {
    this.tasks.push(task);
    this.notify(this.tasks);
  }
  removeTask(target) {
    this.tasks = this.tasks.filter(task => task !== target);
    this.notify(this.tasks);
  }
}