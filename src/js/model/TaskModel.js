import { Observable } from "./Observable.js";
import { getData, deleteData, postData, putData } from "../REST_API.js";

import produce from "immer";

export class TaskModel extends Observable {
  constructor() {
    super();
    this.state = {};

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.modify = this.modify.bind(this);
    this.filter = this.filter.bind(this);
  }
  async initModel() {
    this.state.list = await getData("list");
    this.state.task = await getData("task");
    this.state.subTask = await getData("subTask");

    this.notify(this.state);
  }
  add({ type, data }) {
    data.id = new Date().getTime();
    this.state[type].push(data);

    this.notify(this.state);

    postData(type, data);
  }
  delete({ type, id }) {
    this.state[type] = this.state[type].filter(
      (item) => item.id !== parseInt(id)
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
}
