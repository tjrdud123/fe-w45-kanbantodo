import produce from "immer";
import { deleteData, getData, postData } from "../js/util.js";
import { Observable } from "../js/Observable.js";

export class Model extends Observable {
  constructor() {
    super();
    this.preState = {};
    this.state = {};

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.filter = this.filter.bind(this);
  }
  async initState() {
    const lists = await getData("list");
    const tasks = await getData("task");
    const subTasks = await getData("subTask");

    lists.forEach(list => {
      this.state[list.id] = {
        title: list.title,
        tasks: {}
      }
    });

    tasks.forEach(task => {
      if (this.state[task.listId]) {
        this.state[task.listId].tasks[task.id] = {
          title: task.title,
          subTasks: {}
        }
      }
    });

    subTasks.forEach(subTask => {
      if (this.state[subTask.listId].tasks[subTask.taskId]) {
        this.state[subTask.listId].tasks[subTask.taskId].subTasks[subTask.id] = {
          title: subTask.title
        }
      }
    });

    console.log(this.state);
    this.notify(this.state);
  }

  add(type, info) {
    let state;
    const id = new Date().getTime();

    if (type === "task") {
      info.id = id;
      state = produce(this.state, draft => {
        draft[info.listId].tasks[id] = info;
      });
      postData("task", info);
    } else if (type === "list") {
      const data = { id: id, title: info, tasks: {} };
      state = produce(this.state, draft => {
        draft[id] = data;
      });
      postData("list", data);
    }

    this.state = state;
    this.notify(state);
  }

  delete(type, id, listId) {
    console.log(type, id, listId);
    let state;
    if (type === "task") {
      state = produce(this.state, draft => {
        delete draft[listId].tasks[id];
      });

    } else if (type === "list") {
      state = produce(this.state, draft => {
        delete draft[id];
      });
    }
    deleteData(type, id);
    this.state = state;
    this.notify(state);
  }

  modify() {

  }

  filter(value) {
    if (!value) {
      this.notify(this.state);
      return;
    }
    const reg = new RegExp(`${value}`);

    // immer 사용
    const state = produce(this.state, draft => {
      for (let key in draft) {
        for (let k in draft[key].tasks) {
          if (!reg.test(draft[key].tasks[k].title)) delete draft[key].tasks[k];
        }
      }
    });

    this.notify(state);
  }
}