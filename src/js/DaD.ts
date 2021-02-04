interface Location {
  el: Element;

  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default class DaD {
  root: HTMLElement;
  isMousedown: boolean;
  targetEl: HTMLElement;
  movingEl: HTMLElement;
  ox: number;
  oy: number;

  constructor() {
    this.root = document.body;
    this.isMousedown = false;

    this.targetEl = this.root;
    this.movingEl = this.root;
    [this.ox, this.oy] = [0, 0];
  }

  init(): void {
    this.root.addEventListener("mousedown", (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(".task")) {
        this.isMousedown = true;

        this.targetEl = target;
      }
    });

    this.root.addEventListener("mousemove", ({ clientX, clientY }) => {
      if (!this.isMousedown) return;
      if (this.movingEl === this.root) {
        this.cloneElement(clientX, clientY);
        this.targetEl.classList.add("translucent");
        return;
      }
      this.movingEl.style.transform = `translate(${clientX - this.ox}px, ${
        clientY - this.oy
      }px)`;
      const listEl = this.getEl(".list", clientX, clientY);
      const taskEl = this.getEl(".task", clientX, clientY);
      if (listEl === this.root) return;
      if (taskEl === this.root) listEl.appendChild(this.targetEl);
      else listEl.insertBefore(this.targetEl, taskEl);
    });

    this.root.addEventListener("mouseup", ({}) => {
      if (!this.isMousedown) return;
      this.isMousedown = false;

      if (this.movingEl === this.root) return;
      this.movingEl.remove();

      this.targetEl.classList.remove("translucent");

      this.movingEl = this.root;
      this.targetEl = this.root;

      this.triggerEvent("PATCH_TASK", {
        taskEls: Array.from(document.querySelectorAll(".task")),
      });
    });
  }
  getEl(selector: string, clientX: number, clientY: number): any {
    const items = this.getLocations(selector);
    let ret: Element = this.root;
    let maxY: number = 0;
    items.forEach((location) => {
      if (location.x1 <= clientX && clientX <= location.x2) {
        if (location.y1 <= clientY && clientY <= location.y2) {
          ret = location.el;
        }
      }
    });
    return ret;
  }
  getLocations(selector: string): Location[] {
    const ret: Location[] = [];
    document.querySelectorAll(selector).forEach((item) => {
      const rect = item.getBoundingClientRect();
      ret.push({
        el: item,

        x1: rect.left,
        y1: rect.top,
        x2: rect.right,
        y2: rect.bottom,
      });
    });
    return ret;
  }
  cloneElement(cx: number, cy: number) {
    this.movingEl = document.createElement("div");
    this.movingEl.classList.add("moving");
    this.movingEl.style.width = `${this.targetEl.clientWidth}px`;
    this.movingEl.style.height = `${this.targetEl.clientHeight}px`;
    this.root.append(this.movingEl);

    const rect = this.targetEl.getBoundingClientRect();
    this.movingEl.style.transform = `translate(${rect.left}px, ${rect.top}px)`;

    this.ox = cx - rect.left;
    this.oy = cy - rect.top;
  }
  triggerEvent(type: string, detail: {}) {
    const evt = new CustomEvent(type, {
      detail: detail,
    });
    document.dispatchEvent(evt);
  }
}
