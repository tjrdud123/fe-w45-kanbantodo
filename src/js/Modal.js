const template = {
  confirm() {
    return `<div class="modal-background">
      <div class="modal-confirm border-gray border-radius-10 box-shadow padding-10">
        <div class="modal-confirm_title">Confirm</div>
        <div class="modal-confirm_content">정말 삭제하시겠습니까?</div>
        <div class="horizontal">
          <button class="modal_btn-confirm">확인</button>
          <button class="modal_btn-cancel">취소</button>
        </div>
      </div>
    </div>`;
  },
  detail(data) {
    return (
      `<div class="modal-background">
      <div class="modal-detail border-gray border-radius-10 box-shadow padding-10">
        <div class="modal-detail_title">Edit task</div>
        <div>
          <textarea class="modal-detail_input">${data.title}</textarea>
        </div>
        <div>서브 태스크</div>
        <ul class="sub-tasks">` +
      data.subTasks.reduce((acc, cur) => {
        return acc + `<li>${cur}</li>`;
      }, "") +
      `</ul>
      <input type="text" class="input-sub-task margin-zero">
      <button class="modal-btn-add">+</button>
        <div class="horizontal">
          <button class="modal_btn-confirm">저장</button>
          <button class="modal_btn-cancel">취소</button>
        </div>
      <div>
    </div>`
    );
  },
  edit(data) {
    return `<div class="modal-background">
      <div class="modal-edit border-gray border-radius-10 box-shadow padding-10">
        <div class="modal-edit_title">Edit: ${data.title}</div>
        <div class="modal-confirm_content">
          <input type="text" class="modal-edit_input">
        </div>
        <div class="horizontal">
          <button class="modal_btn-confirm">확인</button>
          <button class="modal_btn-cancel">취소</button>
        </div>
      <div>
    </div>`;
  },
};

export default class Modal {
  constructor(taskId) {
    this.taskId = taskId;
    this.root = document.body;
    this.subTasks = [];
  }

  confirm(callback, ...args) {
    document.addEventListener("CONFIRM", () => {
      callback(...args);
      this.el.remove();
    });
    document.addEventListener("CANCEL", () => {
      this.el.remove();
    });

    this.render("confirm");
  }
  edit(list) {
    document.addEventListener("CONFIRM", () => {
      this.triggerEvent({
        type: "MODIFY_LIST_TITLE",
        detail: {
          id: list.listId,
          value: document.querySelector(".modal-edit_input").value,
        },
      });
      this.el.remove();
    });
    document.addEventListener("CANCEL", () => {
      this.el.remove();
    });

    this.render("edit", list);
  }
  detail(taskModel, data) {
    document.addEventListener("CONFIRM", () => {
      this.subTasks.forEach((item) => {
        taskModel.add({
          type: "subTask",
          data: item,
        });
      });
      this.el.remove();
    });
    document.addEventListener("CANCEL", () => {
      this.el.remove();
    });
    document.addEventListener("ADD", ({ detail }) => {
      document.querySelector(
        ".sub-tasks"
      ).innerHTML += `<li>${detail.title}</li>`;
      this.subTasks.push({
        taskId: this.taskId,
        title: detail.title,
      });
    });
    this.render("detail", data);
  }
  render(type, list) {
    const el = document.createElement("div");
    el.innerHTML = template[type](list);
    el.addEventListener("click", ({ target }) => {
      if (target.matches(".modal_btn-confirm")) {
        this.triggerEvent({
          type: "CONFIRM",
          detail: {},
        });
      } else if (target.matches(".modal_btn-cancel")) {
        this.triggerEvent({
          type: "CANCEL",
          detail: {},
        });
      } else if (target.matches(".modal-btn-add")) {
        this.triggerEvent({
          type: "ADD",
          detail: {
            taskId: this.taskId,
            title: target.previousElementSibling.value,
          },
        });
      }
    });
    this.el = el;
    this.root.append(el);
  }
  triggerEvent({ type, detail }) {
    const evt = new CustomEvent(type, {
      detail: detail,
    });
    document.dispatchEvent(evt);
  }
}
