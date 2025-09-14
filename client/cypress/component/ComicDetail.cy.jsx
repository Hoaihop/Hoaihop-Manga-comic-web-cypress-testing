import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ComicDetail from "../../src/pages/ComicDetail";

describe("<ComicDetail />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should display loading state initially", () => {
    mount(
      <MemoryRouter initialEntries={["/comic/some-slug"]}>
        <Routes>
          <Route path="/comic/:slug" element={<ComicDetail />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Đang tải thông tin truyện...").should("be.visible");
  });

  it("should display comic details when data is fetched", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/truyen-tranh/some-slug",
      {
        statusCode: 200,
        body: {
          data: {
            item: {
              name: "Comic Title",
              thumb_url: "comic.jpg",
              author: ["Author 1", "Author 2"],
              category: [{ name: "Action" }, { name: "Adventure" }],
              content: "<p>This is a comic description.</p>",
              status: "ongoing",
              chapters: [
                {
                  server_data: [
                    {
                      chapter_api_data: "/read/1/1",
                      chapter_name: "Chapter 1",
                    },
                    {
                      chapter_api_data: "/read/1/2",
                      chapter_name: "Chapter 2",
                    },
                  ],
                },
              ],
            },
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comic/some-slug"]}>
        <Routes>
          <Route path="/comic/:slug" element={<ComicDetail />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Comic Title").should("be.visible");
    cy.contains("Tác giả: Author 1, Author 2").should("be.visible");
    cy.contains("Thể loại: Action, Adventure").should("be.visible");
    cy.contains("Đang cập nhật").should("be.visible");
    cy.get(".comic-detail-image")
      .should("have.attr", "src")
      .and("include", "comic.jpg");
  });

  it("should display error message when no comic is found", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/truyen-tranh/some-slug",
      {
        statusCode: 404,
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comic/some-slug"]}>
        <Routes>
          <Route path="/comic/:slug" element={<ComicDetail />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Không tìm thấy truyện").should("be.visible");
  });

  it("should handle missing data gracefully", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/truyen-tranh/some-slug",
      {
        statusCode: 200,
        body: {
          data: {
            item: {
              name: "Comic Without Details",
              thumb_url: "",
              author: [],
              category: [],
              content: "",
              status: "",
              chapters: [],
            },
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comic/some-slug"]}>
        <Routes>
          <Route path="/comic/:slug" element={<ComicDetail />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Comic Without Details").should("be.visible");
    cy.contains("Tác giả: Đang cập nhật").should("be.visible");
    cy.contains("Thể loại: Đang cập nhật").should("be.visible");
    cy.contains("Đang cập nhật").should("be.visible");
  });
});
