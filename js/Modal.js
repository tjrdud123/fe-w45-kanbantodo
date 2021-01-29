/*
  재사용 가능?
  type = "task" || "doubleCheck" || "modify"

  option = {
    width: 300
    height: 100
    isBackgroundDarked: true
  }

  사용법 :
  인스턴스 생성 -> init() 호출, instance.doubleCheck(handler, ...argv)
*/

export class Modal {
  constructor(type = "doubleCheck", option = {}, parentEl = document.body) {
    this.type = type;
    this.option = {
      width: 300,
      height: 100,
      isBackgroundDarked: true,
      ...option
    }
    this.parentEl = parentEl;
    this.tpl = {

    }
    this.defaultInfo = {
      task: {},
      doubleCheck: { message: "정말로 삭제하시겠습니까?" },
      modify: { title: "title" }          
    }
  }
  init(info = {}) {
    this.info = {
      ...this.defaultInfo[this.type],
      ...info
    }

    this.setEl();
    this.parentEl.appendChild(this.el);
    this.close();
  }

  addEventHanlder(el) {
    el.addEventListener("click", ({target}) => {
      if(target.matches(".modal-background")) this.close();
      else if(target.matches(".btn-cancel")) this.close();
      else if(target.matches(".btn-add--active")) {
        console.log(this.argv);
        this.doubleCheckHandler(...this.argv);
        this.close();
      }
    });
  }
  getBtnHtml(left, right) {
    let html = `<div class="btn-box horizontal">`;
    html += `<button class="btn-add--active border-gray border-radius-5">${left}</button>`;
    html += `<button class="btn-cancel border-gray border-radius-5">${right}</button>`;
    html += `</div>`;
    return html;
  }
  getHtml() {
    let html = `<div class="modal border-radius-5" 
      style="width:${this.option.width}px;">`;
    html += `<div class="modal-title border-radius-5">${this.type}</div>`;
    if(this.type === "doubleCheck") html += `<div class="modal-message">${this.info.message}</div>`;
    html += this.getBtnHtml("yes", "no");
    html += `</div>`;
    return html;
  }
  setEl() {
    const el = document.createElement("div");
    el.classList.add("modal-background");
    // 배경 설정
    if(this.option.isBackgroundDarked) el.style.background = "rgb(0, 0, 0, 0.5)";
    else el.style.background = "rgb(0, 0, 0, 1)";

    el.innerHTML = this.getHtml();
    this.addEventHanlder(el);

    this.el = el;
  }
  open() {
    this.el.classList.remove("d-none");
  }
  close() {
    this.el.classList.add("d-none");
  }
  doubleCheck(handler, ...argv) {
    this.doubleCheckHandler = handler;
    this.argv = argv;
    this.open();
  }
}