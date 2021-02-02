/*
  modal 창
*/

export default class Modal {
  public opt: {
    type: "confirm";
    title: "confirm";
  };

  constructor(opt: object) {
    this.opt = {
      ...this.opt,
      ...opt,
    };
    document.body.innerHTML += this.template();
  }
  init(): void {}
  confirm(): boolean {
    return true;
  }
  template(): string {
    let html = `<div class="modal-background d-none">
      <div class="modal">
        <div class="modal_title"></div>
      </div>`;
    return html;
  }
}
