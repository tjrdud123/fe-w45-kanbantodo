import { Observable } from "../js/Observable.js";

class SearchView extends Observable {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.inputEl = getInputEl;
    this.parentEl.appendChild(this.inputEl);
  }
  getInputEl() {
    const el = document.createElement("input");
    el.setAttribute("type", "search");
    el.setAttribute("class", "searchbar__input");
    return el;
  }

  // controller로 옮기기
  initEventListener() {
    this.inputEl.addEventListener("input", ({target}) => {
      const word = target.innerText;
      this.notify(word);
    });
  }
}