import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("ok: renders without crashing", () => {
  render(<Card />);
});

test("ok: matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
