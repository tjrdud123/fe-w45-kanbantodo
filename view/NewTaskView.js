export function getNewTaskHtml(listId) {
  let html = `<div name="${listId}" class="new-task d-none">`;
  html += `<textarea type="text" class="new-task-input border-gray border-radius-5"></textarea>`;
  html += `<div class="btn-box horizontal">`;
  html += `<button class="btn-add--inactive border-gray border-radius-5">Add</button>`;
  html += `<button class="btn-cancel border-gray border-radius-5">Cancel</button>`;
  html += `</div></div>`;
  return html;
}