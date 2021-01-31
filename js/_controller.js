import { Model } from "./model/Model";
import { View } from "./view/View";

async function init(containerEl) {
  const model = new Model();
  const view = new View(model, containerEl);

  await model.init();

  return { model: model, view: view };
}

function addEventHandler(view, model) {
  // view에서 발생하는 event에 대해 핸들러 함수 등록(model의 메소드 필요)
}