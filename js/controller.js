/*
  view에서 발생하는 event handler 함수 정의
*/

export function onInputFilterEvent({target}, model) {
  const value = target.value;
  const reg = /^[가-힣a-zA-Z\s]+$/;

  if (value && !reg.test(value)) return; // 자음 or 모음만 있는 경우 스킵
  model.filter(value);
}

export function onListEvent({target}, model) {
  console.log(target.className);
  if(target.className === "plus-image") {
    // + 버튼
    const listId = target.closest(".list").getAttribute("name");
    const newTaskEl = [...document.querySelectorAll(".new-task")].filter(el => el.getAttribute("name") === String(listId));
    newTaskEl[0].classList.remove("d-none");
  } else if(target.matches(".btn-cancel")) {
    // cancel 버튼
    target.closest(".new-task").classList.add("d-none");
  } else if(target.matches(".btn-add--active")) {
    // add 버튼
  }
}