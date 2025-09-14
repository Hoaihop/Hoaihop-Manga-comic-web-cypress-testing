import { render, screen } from "@testing-library/react";
import ComicDetail from "./ComicDetail";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

describe("ComicDetail", () => {
  test("displays loading text while fetching data", () => {
    render(
      <Router>
        <ComicDetail />
      </Router>
    );

    expect(
      screen.getByText(/Đang tải thông tin truyện.../i)
    ).toBeInTheDocument();
  });
});
