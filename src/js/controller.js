import { TaskModel } from "./model/TaskModel.js";
import { TaskListView } from "./view/TaskListView.js";
import { TaskView } from "./view/TaskView.js";

// model, view 인스턴스 생성, db에서 데이터 받아와서 초기 상태 만들고, view의 event 등록
export async function initMV(containerEl) {
  // model, view 인스턴스 생성
  const taskModel = new TaskModel();
  const taskListView = new TaskListView(taskModel, containerEl);
  const taskView = new TaskView(taskModel, containerEl);

  // db에서 데이터 가져와서 초기상태 만듬
  await taskModel.initModel();

  // view에서 발생하는 이벤트 핸들러 등록
  addEventHandler(taskModel);

  return {
    taskModel: taskModel,
    taskListView: taskListView,
    taskView: taskView,
  };
}

function addEventHandler(taskModel) {
  document.addEventListener("input-filter", ({ detail }) => onInputFilter(taskModel, detail.value));
  document.addEventListener("delete-list", ({ detail }) => onDeleteItem("list", taskModel, detail.id));
  document.addEventListener("delete-task", ({ detail }) => onDeleteItem("task", taskModel, detail.id));
}

function onInputFilter(taskModel, value) {
  const reg = /^[가-힣a-zA-Z0-9\s]+$/;
  if (value && !reg.test(value)) return;
  taskModel.filter(value);
}

function onDeleteItem(type, taskModel, id) {
  taskModel.delete({ type: type, id: id });
}