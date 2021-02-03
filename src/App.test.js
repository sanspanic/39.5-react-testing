import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("ok: renders without crashing", () => {
  render(<App />);
});

test("ok: matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
