import { Observer } from "./Observer.js";

export default class SubTaskView extends Observer {
  constructor(observable, rootEl) {
    super(observable);
    this.rootEl = rootEl;
  }
  update(state) {
    const taskEls = [...document.querySelectorAll(".task")];
    taskEls.forEach((taskEl) => {
      const filtered = state.subTask.filter(
        (subTask) => parseInt(subTask.taskId) === parseInt(taskEl.id)
      );
      if (filtered) taskEl.innerHTML += this.template(filtered);
    });
  }
  template(filtered) {
    let html = `<ul>`;
    html += filtered.reduce((acc, cur) => {
      return acc + `<li id="${cur.id}">${cur.title}</li>`;
    }, "");
    html += `</ul>`;
    return html;
  }
}
