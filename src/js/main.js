import { initMV } from "./controller.js";

window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  console.log("Init page!");
  
  const inputFilterEl = document.querySelector(".input-filter");
  inputFilterEl.addEventListener("input", ({ target }) => {
    const evt = new CustomEvent("input-filter", {
      detail: { value: target.value }
    });
    document.dispatchEvent(evt);
  });

  const containerEl = document.querySelector(".container");
  const instance = initMV(containerEl);


}