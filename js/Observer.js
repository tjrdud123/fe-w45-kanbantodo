class Observer {
  constructor(subject) {
    this.subject = subject;
    this.subject.subscribe(this.update.bind(this));
  }
  update(state) {
    console.log(state);
    // 자식 클래스에서 오버라이딩
  }
}