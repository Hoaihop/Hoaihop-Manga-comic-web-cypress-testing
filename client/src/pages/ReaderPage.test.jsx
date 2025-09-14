import React from "react";
import { render } from "@testing-library/react";
import ReaderPage from "./ReaderPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("ReaderPage", () => {
  // Test trạng thái đang tải
  test("hiển thị trạng thái đang tải khi chưa có dữ liệu", () => {
    render(
      <Router>
        <ReaderPage />
      </Router>
    );
  });
});
