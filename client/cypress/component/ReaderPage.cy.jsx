import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ReaderPage from "../../src/pages/ReaderPage"; // Đảm bảo đường dẫn đúng

describe("ReaderPage", () => {
  beforeEach(() => {
    cy.viewport("macbook-16"); // Thiết lập kích thước màn hình
    // Giả lập điều hướng đến trang ReaderPage với một chapterId mặc định
    mount(
      <MemoryRouter initialEntries={["/reader/658b09b4e120ddf219906897"]}>
        <Routes>
          <Route path="/reader/:chapterId" element={<ReaderPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("should display loading message when fetching chapter data", () => {
    // Kiểm tra xem có thông báo 'Đang tải chương...' khi dữ liệu đang được tải
    cy.get("p").contains("Đang tải chương...").should("exist");
  });

  it("should fetch and display images after chapter is loaded", () => {
    // Giả lập một API trả về dữ liệu chapter với hình ảnh
    cy.intercept(
      "GET",
      "https://sv1.otruyencdn.com/v1/api/chapter/658b09b4e120ddf219906897",
      {
        statusCode: 200,
        body: {
          status: "success",
          data: {
            domain_cdn: "https://sv1.otruyencdn.com",
            item: {
              chapter_image: [
                { image_file: "page_1.jpg" },
                { image_file: "page_2.jpg" },
              ],
              chapter_path:
                "uploads/20231227/ac78171c44f71b74a4e6b7824130b442/chapter_1",
            },
          },
        },
      }
    ).as("getChapter");

    // Đảm bảo rằng API được gọi và trả về dữ liệu đúng
    cy.wait("@getChapter");

    // Kiểm tra nếu hình ảnh được tải
    cy.get("img").should("have.length", 2); // Kiểm tra số lượng hình ảnh được hiển thị
    cy.get("img")
      .first()
      .should(
        "have.attr",
        "src",
        "https://sv1.otruyencdn.com/uploads/20231227/ac78171c44f71b74a4e6b7824130b442/chapter_1/page_1.jpg"
      ); // Kiểm tra ảnh đầu tiên
  });
});
