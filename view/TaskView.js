import closeImage from "../image/close.png";

export function getTaskHtml(tasks) {
  let html = ``;
  for(let key in tasks) {
    html += `<div name="${key}" class="task border-radius-10 border-gray margin-center">${tasks[key].title}`;
    html += `<img src=${closeImage} class="close-image">`;
    html += `<ul>`;
    for(let k in tasks[key].subTasks) html += `<li>${tasks[key].subTasks[k].title}</li>`;
    html += `</ul>`;
    html += `</div>`;
  }
  return html;
}