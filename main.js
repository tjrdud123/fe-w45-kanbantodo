import { getData } from "./js/util.js";
import { ColumnModel } from "./model/ColumnModel.js";
import { ColumnView } from "./view/ColumnView.js";

import { TaskModel } from "./model/TaskModel.js";
import { TaskView } from "./view/TaskView.js";

import "./css/style.scss";
import "./css/common.scss";

window.addEventListener("DOMContentLoaded", main);

const info = {
  columnModel: new ColumnModel(),
  taskModel: new TaskModel()
};

async function main() {
  const containerEl = document.querySelector(".container");
  info.taskView = new TaskView(info.taskModel);
  info.columnView = new ColumnView(info.columnModel, containerEl);

  const columnData = await getData("column");
  info.columnModel.addColumn(...columnData);

  const columnEls = document.querySelectorAll(".task-list");
  [...columnEls].forEach(columnEl => info.taskView.parentEl[columnEl.getAttribute("name")] = columnEl);

  const taskData = await getData("task");
  info.taskModel.addTask(...taskData);
}