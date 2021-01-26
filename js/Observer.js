export class Observer {
  constructor(subject) {
    this.subject = subject;
    this.subject.subscribe(this.update.bind(this)); // 객체 자체 말고 update 함수로 구독
  }
  update(state) {
    console.log(state);
    // TODO : 자식 클래스에서 오버라이딩 해야함
  }
}