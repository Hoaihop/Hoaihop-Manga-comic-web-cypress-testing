import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
describe("SearchResult Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/search?keyword=test"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo "Đang tải dữ liệu" có hiển thị trong khi đang tải dữ liệu
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
