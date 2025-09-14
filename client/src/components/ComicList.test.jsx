import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ComicList from "./ComicList";

describe("ComicList Component", () => {
  // Test 1: Kiểm tra xem có hiển thị thông báo "Đang tải dữ liệu" khi đang tải
  test("should show loading message when fetching data", () => {
    render(<ComicList />);

    // Kiểm tra xem thông báo đang tải có hiển thị
    const loadingMessage = screen.getByText(/Đang tải dữ liệu/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  // Test 2: Kiểm tra xem pagination có hiển thị đúng không
  test("should display pagination buttons", async () => {
    render(<ComicList />);

    await waitFor(() => screen.getByText("Next"));
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeInTheDocument();
  });
});
