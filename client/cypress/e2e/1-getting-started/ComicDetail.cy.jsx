/// <reference types="cypress" />

describe("ComicDetail Page", () => {
  const slug = "ke-tan-nhan-ngay-tan-the-bat-dau-du-tru-hang-ty-tan-vat-tu"; // Thay bằng slug thực tế của bạn

  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.intercept("GET", `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, {
      statusCode: 200,
      body: {
        data: {
          item: {
            name: "Example Comic",
            thumb_url: "comic-thumbnail.jpg",
            author: [""],
            category: [{ name: "Action" }],
            chapters: [
              {
                server_data: [
                  { chapter_name: "Chapter 1", chapter_api_data: "/chapter/1" },
                  { chapter_name: "Chapter 2", chapter_api_data: "/chapter/2" },
                ],
              },
            ],
            content: "<p>Comic description</p>",
            status: "ongoing",
          },
        },
      },
    }).as("getComicDetail");

    // Truy cập vào trang chi tiết truyện
    cy.visit(`http://localhost:5173/comic/${slug}`);
  });

  it("should display comic details", () => {
    // Kiểm tra tiêu đề
    cy.get("h2").should("have.text", "Example Comic");

    // Kiểm tra ảnh bìa truyện
    cy.get(".comic-detail-image")
      .should("have.attr", "src")
      .and("include", "comic-thumbnail.jpg");
  });

  it("should display chapters list", () => {
    // Kiểm tra danh sách chương
    cy.get(".comic-chapter-list h3").should("have.text", "Danh sách chương");

    // Kiểm tra các chương trong danh sách
    cy.get(".comic-chapter-list ul li")
      .should("have.length", 2)
      .first()
      .contains("Chương 1");

    cy.get(".comic-chapter-list ul li").last().contains("Chương 2");
  });

  it("should navigate to the correct chapter when clicking a chapter", () => {
    // Kiểm tra điều hướng khi nhấp vào chương
    cy.get(".comic-chapter-list ul li")
      .first()
      .find("a")
      .should("have.attr", "href")
      .and("include", "/read/1");

    cy.get(".comic-chapter-list ul li")
      .last()
      .find("a")
      .should("have.attr", "href")
      .and("include", "/read/2");
  });

  it("should handle loading state", () => {
    // Truy cập lại trang chi tiết truyện với dữ liệu giả lập bị chậm
    cy.intercept("GET", `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, {
      delay: 1000,
      statusCode: 200,
      body: {
        data: {
          item: {
            name: "Example Comic",
            thumb_url: "comic-thumbnail.jpg",
            author: [],
            category: [{ name: "Action" }],
            chapters: [],
            content: "<p>Comic description</p>",
            status: "ongoing",
          },
        },
      },
    }).as("getComicDetailDelayed");

    // Truy cập lại trang
    cy.visit(`http://localhost:5173/comic/${slug}`);

    // Kiểm tra trạng thái đang tải
    cy.contains("Đang tải thông tin truyện...").should("be.visible");

    // Sau khi tải xong, kiểm tra thông tin truyện
    cy.wait("@getComicDetailDelayed");
    cy.get("h2").should("have.text", "Example Comic");
  });

  it("should handle error when comic not found", () => {
    // Giả lập lỗi khi không tìm thấy dữ liệu truyện
    cy.intercept("GET", `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, {
      statusCode: 404,
      body: { message: "Comic not found" },
    }).as("getComicNotFound");

    cy.visit(`http://localhost:5173/comic/${slug}`);

    // Kiểm tra thông báo lỗi
    cy.contains("Không tìm thấy truyện").should("be.visible");
  });
});
