import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home Component", () => {
  // Test 1: Kiểm tra xem nút "Prev" có hiển thị đúng không
  test("renders prev button correctly", () => {
    render(<Home />);
    const prevButton = screen.getByText("←");
    expect(prevButton).toBeInTheDocument();
  });
});
