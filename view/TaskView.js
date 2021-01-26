import { Observer } from "../js/Observer.js";
import closeImage from "../image/close.png";

export class TaskView extends Observer {
  constructor(observable) {
    super(observable);
    this.parentEl = {};
  }
  update(state) {
    for(let key in this.parentEl) this.parentEl[key].innerHTML = "";
    state.forEach(task => {
      this.parentEl[task.columnId].innerHTML += `<div class="task border-radius-10 border-gray margin-center">${task.title}
        <img src=${closeImage} class="close-image"></div>`;
    });
  }
}