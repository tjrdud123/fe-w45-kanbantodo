import { TaskModel } from "./model/TaskModel.js";
import { TaskListView } from "./view/TaskListView.js";
import { TaskView } from "./view/TaskView.js";
import SubTaskView from "./view/SubTaskView.js";

import Modal from "./Modal.js";

// model, view 인스턴스 생성, db에서 데이터 받아와서 초기 상태 만들고, view의 event 등록
export async function initMV(containerEl) {
  // model, view 인스턴스 생성
  const taskModel = new TaskModel();
  const taskListView = new TaskListView(taskModel, containerEl);
  const taskView = new TaskView(taskModel, containerEl);
  const subTaskView = new SubTaskView(taskModel, containerEl);
  // db에서 데이터 가져와서 초기상태 만듬
  await taskModel.initModel();

  addEventHandler(taskModel);

  return {
    taskModel: taskModel,
    taskListView: taskListView,
    taskView: taskView,
  };
}

// 뷰 에서 발생하는 커스텀 이벤트 핸들러 등록
function addEventHandler(taskModel) {
  document.addEventListener("INPUT_FILTER", ({ detail }) =>
    onInputFilter(taskModel, detail.value)
  );
  document.addEventListener("DELETE_LIST", ({ detail }) =>
    onDeleteItem("list", taskModel, detail.id)
  );
  document.addEventListener("DELETE_TASK", ({ detail }) =>
    onDeleteItem("task", taskModel, detail.id)
  );
  document.addEventListener("ADD_TASK", ({ detail }) =>
    onAddItem("task", taskModel, detail)
  );
  document.addEventListener("EDIT", ({ detail }) => {
    onEditListTitle(detail);
  });
  document.addEventListener("MODIFY_LIST_TITLE", ({ detail }) => {
    onModifyListTitle(taskModel, detail);
  });
  document.addEventListener("DETAIL", ({ detail }) => {
    onDetail(taskModel, detail);
  });
  document.addEventListener("PATCH_TASK", ({ detail }) => {
    const taskEls = detail.taskEls;
    taskModel.patchTask(taskEls);
  });
}

function onInputFilter(taskModel, value) {
  const reg = /^[가-힣a-zA-Z0-9\s]+$/;
  if (value && !reg.test(value)) return;
  taskModel.filter(value);
}

function onDeleteItem(type, taskModel, id) {
  const modal = new Modal();
  modal.confirm(taskModel.delete, { type: type, id: id });
}

function onAddItem(type, taskModel, data) {
  taskModel.add({ type: type, data: data });
}

function onEditListTitle(list) {
  const modal = new Modal();
  modal.edit(list);
}

function onModifyListTitle(taskModel, data) {
  taskModel.modify("list", data);
}

function onDetail(taskModel, data) {
  const modal = new Modal(data.id);
  modal.detail(taskModel, data);
}
