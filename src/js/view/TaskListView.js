import { Observer } from "./Observer.js";

import closeImage from "../../image/close.png";
import plusImage from "../../image/plus.png";

export class TaskListView extends Observer {
  constructor(observable, rootEl) {
    super(observable);
    this.rootEl = rootEl;
    this.rootEl.addEventListener("click", ({ target }) => this.onClickEvent(target));
  }
  update(state) {
    this.rootEl.innerHTML = state.list.reduce((acc, cur) => {
      return acc + this.template(cur);
    }, "");
  }
  render(state) {
    // 뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보를 지닌 객체를 반환(가상돔)
  }
  template(data) {
    let html =
      `<div id="${data.id}" class="list margin-10 border-gray">${data.title}` +
      `<img src=${closeImage} class="close-image-list">` +
      `<img src=${plusImage} class="plus-image">` +
      `<div class="task-list"></div>` +
      `</div>`;

    return html;
  }
  onClickEvent(target) {
    if(target.matches(".close-image-list")) {
      this.triggerEvent({ type: "delete-list", detail: { id: this.getId(target) }} );
    }
    else if(target.matches(".plus-image")) {
              
    }
  }
}