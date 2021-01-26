import { Observable } from "../js/Observable.js";

export class ColumnModel extends Observable {
  constructor() {
    super();
    this.columns = [];
  }
  addColumn(...columns) {
    this.columns = [...this.columns, ...columns];
    this.notify(this.columns);
  }
  removeColumn(id) {}
}