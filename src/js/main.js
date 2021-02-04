import { initMV } from "./controller.js";
import DaD from "./DaD.ts";

window.addEventListener("DOMContentLoaded", initPage);

async function initPage() {
  console.log("Init page!");

  const inputFilterEl = document.querySelector(".input-filter");
  inputFilterEl.addEventListener("input", ({ target }) => {
    const evt = new CustomEvent("INPUT_FILTER", {
      detail: { value: target.value },
    });
    document.dispatchEvent(evt);
  });

  const containerEl = document.querySelector(".container");
  const instance = await initMV(containerEl);

  const dad = new DaD();
  dad.init();
}
