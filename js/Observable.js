export class Observable {
  constructor() {
    this.observers = new Set();
  }
  subscribe(observer) {
    this.observers.add(observer);
  }
  unsubscribe() {
    this.observers.delete(observer);
  }
  notify(state) {
    this.observers.forEach(observer => observer(state));
  }
}