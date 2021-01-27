import { Model } from "../model/Model.js";
import { ListView } from "../view/ListView.js";

import { onInputFilterEvent, onListEvent } from "./controller.js";

window.addEventListener("DOMContentLoaded", main);

function main() {
  console.log("init page!");
  const containerEl = document.querySelector(".container");
  
  const model = new Model();
  const listView = new ListView(model, containerEl);
  model.initState();

  const inputFilterEl = document.querySelector(".input-filter");
  inputFilterEl.addEventListener("input", e => {
    onInputFilterEvent(e, model);
  });

  containerEl.addEventListener("click", e => {
    onListEvent(e, model);
  });
}