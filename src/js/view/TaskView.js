import { Observer } from "./Observer.js";

import closeImage from "../../image/close.png";

export class TaskView extends Observer {
  constructor(observable, rootEl) {
    super(observable);
    this.rootEl = rootEl;
    this.rootEl.addEventListener("click", ({ target }) => {
      if (target.matches(".close-image-task")) {
        this.triggerEvent({
          type: "delete-task",
          detail: { id: this.getId(target) },
        });
      }
    });
    this.rootEl.addEventListener("dblclick", ({ target }) => {
      if (target.matches(".task")) {
        this.triggerEvent({
          type: "DETAIL",
          detail: {
            id: target.id,
            title: target.getAttribute("name"),
            subTasks: [...target.lastChild.childNodes].map(
              (item) => item.innerText
            ),
          },
        });
      }
    });
  }
  update(state) {
    [...this.rootEl.childNodes].forEach((listEl) => {
      const listId = listEl.id;
      const filtered = state.task.filter((task) => task.listId === listId);
      listEl.innerHTML += `<div>${filtered.length}개</div>`;
      listEl.innerHTML += filtered.reduce((acc, cur) => {
        return acc + this.template(cur);
      }, "");
    });
  }
  render(state) {}
  template(data) {
    let html =
      `<div id="${data.id}" name="${data.title}" class="task border-radius-10 border-gray margin-center">${data.title}` +
      `<img id="${data.id}" src=${closeImage} class="close-image-task">` +
      `</div>`;
    return html;
  }
}
