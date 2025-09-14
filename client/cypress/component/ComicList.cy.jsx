import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ComicList from "../../src/components/ComicList";

describe("<ComicList />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16"); // Đặt kích thước màn hình
  });

  it("should display loading state initially", () => {
    mount(
      <MemoryRouter initialEntries={["/comics"]}>
        <Routes>
          <Route path="/comics" element={<ComicList />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Đang tải dữ liệu...").should("be.visible");
  });

  it("should display a list of comics when data is fetched", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                _id: "1",
                slug: "comic-1",
                thumb_url: "comic1.jpg",
                name: "Comic 1",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 1",
                    chapter_api_data: "/read/1/1",
                  },
                ],
              },
              {
                _id: "2",
                slug: "comic-2",
                thumb_url: "comic2.jpg",
                name: "Comic 2",
                chaptersLatest: [],
              },
            ],
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comics"]}>
        <Routes>
          <Route path="/comics" element={<ComicList />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Danh sách truyện mới").should("be.visible");
    cy.contains("Comic 1").should("be.visible");
    cy.contains("Comic 2").should("be.visible");
    cy.get(".comic-item").should("have.length", 2);
  });

  it("should display no data message if no comics are available", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1",
      {
        statusCode: 200,
        body: { data: { items: [] } },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comics"]}>
        <Routes>
          <Route path="/comics" element={<ComicList />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Không có dữ liệu truyện").should("be.visible");
  });

  it("should handle pagination correctly", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                _id: "1",
                slug: "comic-1",
                thumb_url: "comic1.jpg",
                name: "Comic 1",
                chaptersLatest: [],
              },
            ],
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comics"]}>
        <Routes>
          <Route path="/comics" element={<ComicList />} />
        </Routes>
      </MemoryRouter>
    );

    cy.contains("Prev").should("be.disabled");
    cy.contains("Next").should("not.be.disabled").click();

    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=2",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                _id: "2",
                slug: "comic-2",
                thumb_url: "comic2.jpg",
                name: "Comic 2",
                chaptersLatest: [],
              },
            ],
          },
        },
      }
    );
  });

  it("should display chapter links for a comic", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                _id: "1",
                slug: "comic-1",
                thumb_url: "comic1.jpg",
                name: "Comic 1",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 1",
                    chapter_api_data: "/read/1/1",
                  },
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/read/1/2",
                  },
                ],
              },
            ],
          },
        },
      }
    );

    mount(
      <MemoryRouter initialEntries={["/comics"]}>
        <Routes>
          <Route path="/comics" element={<ComicList />} />
        </Routes>
      </MemoryRouter>
    );
  });
});
