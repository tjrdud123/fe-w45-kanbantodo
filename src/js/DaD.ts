interface DragAndDrop {
  root: HTMLElement;
}

export default class DaD implements DragAndDrop {
  public root: HTMLElement;
  constructor() {
    this.root = document.body;
  }
}
