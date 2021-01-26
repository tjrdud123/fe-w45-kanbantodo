import { info } from "./js/controller.js";
import { ColumnView } from "./view/columnView.js";

import "./css/style.scss";
import "./css/common.scss";

window.addEventListener("DOMContentLoaded", (e) => {
  info.initColumns();
});
