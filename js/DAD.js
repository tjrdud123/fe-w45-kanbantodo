export const DaD = {
  root: document.body,
  originalEl: null,
  copiedEl: null,
  expectedEl: null,
  init(model) {
    this.model = model;
    const lists = [...document.querySelector(".container").children];
    lists.pop();
    const xs = lists.map(el => {
      const rect = el.getBoundingClientRect();
      return rect.left;
    });
    this.root.addEventListener("mousedown", ({target, offsetX, offsetY}) => {
      if(!target.matches(".task")) return;
      this.originalEl = target;
      [this.oX, this.oY] = [offsetX, offsetY];
      this.copiedEl = target.cloneNode();
      this.copiedEl.classList.add("copied");
      this.originalEl.classList.add("translucent");
      this.root.appendChild(this.copiedEl);

      const rect = target.getBoundingClientRect();
      const [x, y] = [rect.left, rect.top];
      this.copiedEl.style.transform = `translate(${x}px, ${y}px)`;
      this.expectedEl = this.originalEl.cloneNode(true);
      this.expectedEl.classList.add("expected");
      console.log(this.expectedEl);
    });
    this.root.addEventListener("mousemove", ({clientX, clientY}) => {
      if(this.copiedEl) this.copiedEl.style.transform = `translate(${clientX - this.oX}px, ${clientY - this.oY}px)`;
      let i = 0;
      for(; i < xs.length; i++) {
        if(clientX < xs[i]) break;
      }
      const idx = i - 1;
      if(!this.expectedEl) return;
      lists[idx].appendChild(this.expectedEl);
    });
    this.root.addEventListener("mouseup", ({clientX, clientY}) => {
      if(this.copiedEl) this.copiedEl.remove();
      if(this.expectedEl) this.expectedEl.remove();
      if(this.originalEl) this.originalEl.classList.remove("translucent");
      this.copiedEl = null;
      this.expectedEl = null;
      
      let i = 0;
      for(; i < xs.length; i++) {
        if(clientX < xs[i]) break;
      }
      const idx = i - 1;
      const id = this.originalEl.getAttribute("name");
      const from = this.originalEl.closest(".list").getAttribute("name");
      const to = lists[idx].getAttribute("name");
      const title = this.originalEl.firstChild;
      const info = {
        id: id,
        listId: to,
        title: title.textContent
      }
      model.modify("task", info, from, to);
      this.originalEl = null;
    });
    
  }
}