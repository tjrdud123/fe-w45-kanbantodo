import closeImage from "../image/close.png";

export function getTaskHtml(tasks) {
  let html = ``;
  for(let key in tasks) {
    html += `<div name="${key}" class="task border-radius-10 border-gray margin-center">${tasks[key].title}` +
      `<img src=${closeImage} class="close-image"></div>`;
  }
  return html;
}