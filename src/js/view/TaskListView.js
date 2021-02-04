import { Observer } from "./Observer.js";

import closeImage from "../../image/close.png";
import plusImage from "../../image/plus.png";

export class TaskListView extends Observer {
  constructor(observable, rootEl) {
    super(observable);

    this.rootEl = rootEl;
    this.rootEl.addEventListener("click", ({ target }) =>
      this.onClickEvent(target)
    );
    this.rootEl.addEventListener("dblclick", ({ target }) => {
      if (target.matches(".list")) {
        this.triggerEvent({
          type: "EDIT",
          detail: {
            title: target.getAttribute("name"),
            listId: target.id,
          },
        });
      }
    });
  }
  update(state) {
    this.rootEl.innerHTML = state.list.reduce((acc, cur) => {
      return acc + this.template(cur);
    }, "");
  }

  template(data) {
    let html =
      `<div id="${data.id}" name="${data.title}" class="list margin-10 border-gray">${data.title}` +
      `<img src=${closeImage} class="close-image-list">` +
      `<img src=${plusImage} class="plus-image">` +
      this.newTaskTpl(data.id) +
      `<div class="task-list"></div>` +
      `</div>`;

    return html;
  }
  newTaskTpl(listId) {
    let html =
      `<div class="new-task">` +
      `<textarea type="text" class="new-task-input border-gray border-radius-5"></textarea>` +
      `<div class="btn-box horizontal">` +
      `<button id="${listId}" class="btn-add--active border-gray border-radius-5">Add</button>` +
      `<button class="btn-cancel border-gray border-radius-5">Cancel</button>` +
      `</div></div>`;

    return html;
  }
  onClickEvent(target) {
    if (target.matches(".close-image-list")) {
      this.triggerEvent({
        type: "DELETE_LIST",
        detail: { id: this.getId(target) },
      });
    } else if (target.matches(".plus-image")) {
    } else if (target.matches(".btn-add--active")) {
      const title = target.closest(".new-task").firstElementChild.value;
      this.triggerEvent({
        type: "ADD_TASK",
        detail: { listId: target.id, title: title },
      });
    }
  }
}
