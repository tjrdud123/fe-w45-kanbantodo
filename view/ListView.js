import { Observer } from "../js/Observer.js";
import { getNewTaskHtml } from "./NewTaskView.js";
import { getTaskHtml } from "./TaskView.js";

import closeImage from "../image/close.png";
import plusImage from "../image/plus.png";

export class ListView extends Observer {
  constructor(observable, parentEl) {
    super(observable);
    this.parentEl = parentEl;
  }
  update(state) {
    let html = "";
    for(let key in state) {
      html += this.getListHtml(state[key], key);
    }
    html += this.getNewListHtml();
    this.parentEl.innerHTML = html;
  }
  getListHtml(list, id) {
    let html = `<div name="${id}" class="list margin-10 border-gray">${list.title}`;
    html += `<img src=${closeImage} class="close-image">`;
    html += `<img src=${plusImage} class="plus-image">`;
    html += `<div class="task-list">`;
    html += getNewTaskHtml(id);
    html += getTaskHtml(list.tasks);
    html += `</div></div>`;
    return html;
  }

  getNewListHtml() {
    return `<div class="new-list margin-10">Add column</div>`;
  }
}