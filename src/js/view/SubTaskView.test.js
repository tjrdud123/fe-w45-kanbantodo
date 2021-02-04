import { _ } from "core-js";
import { SubTaskView } from "./SubTaskView.js";
import { Observable } from "../model/Observable.js";
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
test("template()", () => {
  const subTaskView = new SubTaskView(new Observable(), document.body);

  const expected = `<ul>` + `<li id="123">서브 태스크</li>` + `</ul>`;

  const data = {
    id: 123,
    title: "서브 태스크",
  };
  expect(expected).toBe(subTaskView.template([data]));
});

test("1 is 1", () => {
  expect(1).toBe(1);
});
