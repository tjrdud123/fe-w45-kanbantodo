/*
  view와 model을 관리
*/

const URL = "http://127.0.0.1:3000"; // URL 하드코딩 안하는 방법 알아보기

import { ColumnModel } from "../model/ColumnModel.js";

import { ColumnView } from "../view/ColumnView.js";
import { SearchView } from "../view/SearchView.js";

async function getData(type, query) {
  let url = `${URL}/${type}`;
  if (query) {
    url += "?";
    for (let key in query) url += `${key}=${query[key]}&`;
  }
  const res = await fetch(url);
  const resData = await res.json();
  return resData;
}

export const info = {
  columnViews: [],
  columnModels: [],
  initColumns() {
    const containerEl = document.querySelector(".container");
    getData("column").then((data) => {
      data.forEach((column) => {
        const cm = new ColumnModel(column);
        this.columnModels.push(cm);
        this.columnViews.push(new ColumnView(cm, containerEl, column.title));
        cm.getData();
      });
    });
  }
}