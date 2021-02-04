import { Observable } from "./Observable.js";
import { getData, deleteData, postData, putData, patch } from "../REST_API.js";

import produce from "immer";
import { v4 as uuidv4 } from "uuid";

export class TaskModel extends Observable {
  constructor() {
    super();
    this.state = {};

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.modify = this.modify.bind(this);
    this.filter = this.filter.bind(this);
  }
  initModel() {
    Promise.all([getData("list"), getData("task"), getData("subTask")]).then(
      (data) => {
        this.state.list = data[0];
        this.state.task = data[1];
        this.state.subTask = data[2];

        this.notify(this.state);
      }
    );
  }
  add({ type, data }) {
    console.log(type, data);
    data.id = uuidv4();
    data.order = -1;
    this.state[type].push(data);

    this.notify(this.state);

    postData(type, data);
  }
  delete({ type, id }) {
    this.state[type] = this.state[type].filter(
      (item) => parseInt(item.id) !== parseInt(id)
    );
    this.notify(this.state);

    deleteData(type, id);
  }
  modify(type, info) {
    this.state[type] = this.state[type].map((item) => {
      if (item.id !== parseInt(info.id)) return item;
      putData("list", { id: item.id, title: info.value });
      item.title = info.value;
      return item;
    });
    this.notify(this.state);
  }
  filter(word) {
    if (!word) {
      this.notify(this.state);
      return;
    }
    const reg = new RegExp(`${word}`);
    const newState = produce(this.state, (draft) => {
      draft.task = draft.task.filter((task) => reg.test(task.title));
    });
    this.notify(newState);
  }
  patchTask(taskEls) {
    const tasks = [];
    taskEls.forEach((taskEl, idx) => {
      const listId = taskEl.closest(".list").id;
      const task = {
        id: taskEl.id,
        listId: listId,
        title: taskEl.getAttribute("name"),
        order: idx,
      };
      patch("task", task);
      tasks.push(task);
    });
    this.state.task = tasks;
    this.notify(this.state);
  }
}
