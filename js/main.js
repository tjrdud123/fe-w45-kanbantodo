import { Model } from "../model/Model.js";
import { ListView } from "../view/ListView.js";

import { onInputFilterEvent, onListEvent } from "./controller.js";
import { Modal } from "./Modal.js";
import { DaD } from "./DAD.js";

window.addEventListener("DOMContentLoaded", main);

function main() {
  console.log("init page!");
  const containerEl = document.querySelector(".container");
  
  const model = new Model();
  const listView = new ListView(model, containerEl);
  model.initState().then(data => {
    DaD.init(model);
  });

  const inputFilterEl = document.querySelector(".input-filter");
  inputFilterEl.addEventListener("input", e => {
    onInputFilterEvent(e, model);
  });

  containerEl.addEventListener("click", e => {
    onListEvent(e, model);
  });
  containerEl.addEventListener("input", ({target}) => {
    if(target.matches(".new-task-input")) {
      const btnEl = target.nextSibling.firstElementChild;
      if(target.value) {
        btnEl.classList.remove("btn-add--inactive");
        btnEl.classList.add("btn-add--active");
      } else {
        btnEl.classList.remove("btn-add--active");
        btnEl.classList.add("btn-add--inactive");
      }
    }
  });
}