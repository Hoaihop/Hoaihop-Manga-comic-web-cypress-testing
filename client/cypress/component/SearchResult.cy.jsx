import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SearchResult from "../../src/pages/SearchResult";

describe("<SearchResult />", () => {
  it("should display a message when no search keyword is provided", () => {
    cy.viewport("macbook-16"); // Đặt kích thước màn hình
    mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Bạn chưa nhập từ khóa tìm kiếm.").should("be.visible");
  });

  it("should display loading state when searching", () => {
    cy.viewport("macbook-16");
    mount(
      <MemoryRouter initialEntries={["/search?keyword=naruto"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Đang tải dữ liệu...").should("be.visible");
  });

  it("should display results when search is successful", () => {
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=naruto",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                slug: "naruto",
                thumb_url: "naruto.jpg",
                name: "Naruto",
                author: ["Masashi Kishimoto"],
              },
            ],
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/search?keyword=naruto"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Kết quả tìm kiếm: naruto").should("be.visible");
    cy.contains("Naruto").should("be.visible");
    cy.contains("Tác giả: Masashi Kishimoto").should("be.visible");
    cy.get(".comic-image")
      .should("have.attr", "src")
      .and("include", "naruto.jpg");
  });

  it("should display an error message when search fails", () => {
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=naruto",
      {
        statusCode: 500,
      }
    );

    mount(
      <MemoryRouter initialEntries={["/search?keyword=naruto"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Không thể tải kết quả tìm kiếm, vui lòng thử lại sau.").should(
      "be.visible"
    );
  });

  it("should display no results message if no comics are found", () => {
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=unknown",
      {
        statusCode: 200,
        body: { data: { items: [] } },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/search?keyword=unknown"]}>
        <Routes>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains('Không tìm thấy kết quả nào cho từ khóa "unknown".').should(
      "be.visible"
    );
  });
});
