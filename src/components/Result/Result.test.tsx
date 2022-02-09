import React from "react";
import Result from "./Result";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

test("renders content", () => {
  const result = {
    result: "12.50",
    type: "success",
    visible: true,
  };

  const view = render(
    <Result
      result={result.result}
      visible={result.visible}
      type={result.type}
    />
  );

  expect(view.container).toHaveTextContent("12.50");
});

test("renders error", () => {
  const result = {
    result: "12.50",
    type: "error",
    visible: true,
  };

  const view = render(
    <Result
      result={result.result}
      visible={result.visible}
      type={result.type}
    />
  );

  expect(view.container).toHaveTextContent("Invalid input, please try again");
});

test("renders nothing", () => {
  const result = {
    result: "0",
    type: "",
    visible: false,
  };

  const view = render(
    <Result
      result={result.result}
      visible={result.visible}
      type={result.type}
    />
  );

  expect(view.container.innerHTML).toBeFalsy();
});
