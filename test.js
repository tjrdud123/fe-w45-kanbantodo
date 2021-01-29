const DaD = {
  root: document.body,
  originalEl: null,
  copiedEl: null,
  expectedEl: null,
  init() {
    const lists = [...document.querySelector(".container").children];
    const xs = lists.map(el => {
      const rect = el.getBoundingClientRect();
      return rect.left;
    });
    this.root.addEventListener("mousedown", ({target, offsetX, offsetY}) => {
      if(!target.matches(".task")) return;
      this.originalEl = target;
      [this.oX, this.oY] = [offsetX, offsetY];
      this.copiedEl = target.cloneNode(true);
      this.copiedEl.classList.add("copied");
      this.originalEl.classList.add("translucent");
      this.root.appendChild(this.copiedEl);

      const rect = target.getBoundingClientRect();
      const [x, y] = [rect.left, rect.top];
      this.copiedEl.style.transform = `translate(${x}px, ${y}px)`;
      this.expectedEl = this.originalEl.cloneNode(true);
      this.expectedEl.classList.add("expected");
    });
    this.root.addEventListener("mousemove", ({clientX, clientY}) => {
      if(this.copiedEl) this.copiedEl.style.transform = `translate(${clientX - this.oX}px, ${clientY - this.oY}px)`;
      let i = 0;
      for(; i < xs.length; i++) {
        if(clientX < xs[i]) break;
      }
      const idx = i - 1;
      if(!this.expectedEl) return;
      console.log("A");
      lists[idx].appendChild(this.expectedEl);
    });
    this.root.addEventListener("mouseup", ({clientX, clientY}) => {
      if(this.copiedEl) this.copiedEl.remove();
      if(this.originalEl) this.originalEl.classList.remove("translucent");
      this.copiedEl = null;
      this.expectedEl = null;
    });
    this.root.addEventListener("mouseover", ({target}) => {
      if(!target.matches(".list")) return;
      if(!this.expectedEl) return;
      target.appendChild(this.expectedEl);
    });
    this.root.addEventListener("mouseout", ({target}) => {
      if(!target.matches(".list")) return;
      if(!this.expectedEl) return;
      target.removeChild(target.lastChild);
    });
  }
}

DaD.init();