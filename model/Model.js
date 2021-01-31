import produce from "immer";
import { deleteData, getData, postData, putData } from "../js/util.js";
import { Observable } from "../js/Observable.js";

export class Model extends Observable {
  constructor() {
    super();
    this.state = {};

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.modify = this.modify.bind(this);
    this.filter = this.filter.bind(this);
  }
  async init() {
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

    this.notify(this.state);
  }

  add(type, info) {
    const id = new Date().getTime();
    info.id = id;
    
    let newState;
    if(type === "list") {
      newState = produce(this.state, draft => {
        info.tasks = {};
        draft[id] = info;
      }); 
    } else if(type === "task") {
      newState = produce(this.state, draft => {
        draft[info.listId].tasks[id] = info;
      });
    }

    this.notify(newState);
    this.state = newState;
    postData(type, info);
  }

  delete(type, id, listId) {
    let newState;
    if(type === "list") {
      newState = produce(this.state, draft => {
        delete draft[id];
      });
    } else if(type === "task") {
      newState = produce(this.state, draft => {
        delete draft[listId].tasks[id];
      })
    }
   
    this.notify(newState);
    this.state = newState;
    deleteData(type, id);
  }

  modify(type, info, from, to) {
    let state;
    if(type === "task") {
      state = produce(this.state, draft => {
        delete draft[from].tasks[info.id];
        draft[to].tasks[info.id] = info;
      });
    }
    putData("task", info);
    this.state = state;
    this.notify(state);
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