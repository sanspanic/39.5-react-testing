import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("ok: renders without crashing", () => {
  render(<Carousel />);
});

test("ok: matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

test("ok: moves forward upon click on the right arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

test("ok: moves backwards upon click on left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

test("ok: left arrow hidden at beginning", () => {
  const { queryByTestId } = render(<Carousel />);

  // expect left arrow not to be in DOM at beginning
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

test("ok: right arrow hidden at end", () => {
  const { queryByText, queryByTestId, debug } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");

  //get information on how many pictures there are in total
  const amountInfoString = queryByText("image", { exact: false });
  const amountInfoArr = amountInfoString.innerHTML.split(" ");
  const num = Number(amountInfoArr[amountInfoArr.length - 1][0]);

  //loop and click on arrow correct amount of times
  for (let i = 0; i < num - 1; i++) {
    fireEvent.click(rightArrow);
  }

  // expect right arrow not to be in DOM at end
  expect(rightArrow).not.toBeInTheDocument();
});
