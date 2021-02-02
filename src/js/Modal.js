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
  taskDetail() {},
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
  constructor() {
    this.root = document.body;
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
