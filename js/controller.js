import { Modal } from "./Modal.js";

// modal test
const modal = new Modal("doubleCheck", { width: 500, height: 300, isBackgroundDarked: true});
modal.init();

export function onInputFilterEvent({target}, model) {
  const value = target.value;
  const reg = /^[가-힣a-zA-Z\s]+$/;

  if (value && !reg.test(value)) return; // 자음 or 모음만 있는 경우 스킵
  model.filter(value);
}

// 리팩토링 해야할듯 ㅠㅠ
export function onListEvent({target}, model) {
  if(target.className === "plus-image") {
    // + 버튼
    const listId = target.closest(".list").getAttribute("name");
    const newTaskEl = [...document.querySelectorAll(".new-task")].filter(el => el.getAttribute("name") === String(listId));
    newTaskEl[0].classList.remove("d-none");
  } else if(target.matches(".btn-cancel")) {
    // cancel 버튼
    target.closest(".new-task").classList.add("d-none");
  } else if(target.matches(".btn-add--active")) {
    // add 버튼
    const value = target.closest(".new-task").firstElementChild.value;
    const listId = target.closest(".list").getAttribute("name");
    model.add("task", {listId: listId, title: value});
  } else if(target.matches(".close-image") && target.parentNode.matches(".task")) {
    const id = target.parentNode.getAttribute("name");
    const listId = target.closest(".list").getAttribute("name");
    modal.doubleCheck(model.delete, "task", id, listId);
    //model.delete("task", id, listId);
  } else if(target.className === "new-list-btn") {
    model.add("list", { title: target.previousSibling.value });
  } else if(target.parentNode.matches(".list")) {
    const id = target.parentNode.getAttribute("name");
    if(parseInt(id) <= 3) return; // default list
    model.delete("list", id);
  }
}