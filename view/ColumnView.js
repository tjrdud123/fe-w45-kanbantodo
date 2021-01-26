import { Observer } from "../js/Observer.js";
import closeImage from "../image/close.png";
import taskImage from "../image/task.png";
import plusImage from "../image/plus.png";

export class ColumnView extends Observer {
  constructor(model, parentEl, title) {
    super(model);
    this.parentEl = parentEl;
    this.title = title;
    this.el = this.getEl();
    this.parentEl.appendChild(this.el);
    this.tpl = {
      header(taskCnt, title) {
        return `<img src=${closeImage} class="close-image"><div><div class="horizontal">` +
          `<div class="number-box">${taskCnt}</div>&nbsp;&nbsp;` +
          `<div class="column-title">${title}</div>` +
          `</div></div>`;
      },
      task(title) { 
        return `<div class="task margin-center border-radius-10 border-gray"><img src=${closeImage} class="close-image">` +
         `<div class="horizontal"><img src=${taskImage} class="task-image">&nbsp;<div>${title}</div></div>` +
         `</div>`;
      }
    }
  }
  getEl() {
    const el = document.createElement("div");
    el.setAttribute("class", "column margin-10 border-gray");
    return el;
  }

  update(state) {
    // overriding
    if (typeof state === "string") {
      // state === word(searchbarView 에서 변경이 일어남)

    } else {
      // state === tasks(columnModel 에서 변경이 일어남)
      let html = this.tpl.header(state.length, this.title);
      html += state.reduce((acc, cur) => {
        return acc + this.tpl["task"](cur.title);
      }, "");
      this.el.innerHTML = html;
    }
  }
}