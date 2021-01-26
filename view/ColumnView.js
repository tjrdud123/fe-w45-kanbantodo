import { Observer } from "../js/Observer.js";
import closeImage from "../image/close.png";
import plusImage from "../image/plus.png";

export class ColumnView extends Observer {
  constructor(subject, parentEl) {
    super(subject);
    this.parentEl = parentEl;
  }
  
  update(state) {
    let html = state.reduce((acc, cur) => {
      return acc + `<div class="column margin-10 border-gray">${cur.title}
        <img src=${closeImage} class="close-image">
        <img src=${plusImage} class="plus-image">
        <div name="${cur.id}" class="task-list"></div>
        </div>`;
    }, "");
    this.parentEl.innerHTML = html;
  }
}