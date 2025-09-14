describe("Reader Page", () => {
  beforeEach(() => {
    // Mở trang ReaderPage với chapterId giả lập (ví dụ: chapter 1)
    cy.visit("http://localhost:5173/read/65ae1c00d9c91173cd7e0f8d");
    cy.viewport("macbook-16");
  });

  it("should display the chapter selection dropdown", () => {
    // Kiểm tra xem dropdown "Chọn chương" có hiển thị không
    cy.get(".chapter-select-container").should("be.visible");
    cy.get("select#chapterSelect").should("be.visible");
    cy.get("option[value='']").should("have.text", "Chọn chương:");
  });

  it("should fetch and display images for the chapter", () => {
    // Kiểm tra xem trang có hiển thị hình ảnh khi chapter đã được tải
    cy.get("img").should("have.length.greaterThan", 0); // Kiểm tra ít nhất 1 hình ảnh được tải
  });

  it("should show loading message while chapter data is being fetched", () => {
    // Kiểm tra xem khi dữ liệu đang tải thì thông báo "Đang tải chương..." có hiển thị không
    cy.get("p").contains("Đang tải chương...").should("be.visible");
  });

  it("should show an error message when no images are available", () => {
    // Giả lập không có hình ảnh để kiểm tra lỗi
    cy.intercept(
      "GET",
      "https://sv1.otruyencdn.com/uploads/20231227/chapter_1",
      {
        statusCode: 200,
        body: {
          status: "success",
          data: {
            domain_cdn: "https://sv1.otruyencdn.com",
            item: {
              chapter_image: [], // Không có hình ảnh
            },
          },
        },
      }
    ).as("getChapter");

    // Mở lại trang với chapter không có hình ảnh
    cy.visit("http://localhost:5173/read/65ae1c00d9c91173cd7e0f8d2");

    // Kiểm tra thông báo lỗi
    cy.get(".images-container p")
      .contains("Không có hình ảnh để hiển thị.")
      .should("be.visible");
  });

  it("should show an error message if the API request fails", () => {
    // Giả lập lỗi API (ví dụ: không thể lấy dữ liệu chương)
    cy.intercept(
      "GET",
      "https://sv1.otruyencdn.com/uploads/20231227/chapter_1/",
      {
        statusCode: 500,
        body: {
          status: "error",
          message: "Internal Server Error",
        },
      }
    ).as("getChapterError");

    // Mở lại trang với lỗi API
    cy.visit("http://localhost:5173/read/65ae1c00d9c91173cd7e0f8d2");

    // Kiểm tra xem có thông báo lỗi không (kiểm tra console hoặc các thông báo lỗi trên UI)
    cy.get(".images-container p")
      .contains("Không có hình ảnh để hiển thị.")
      .should("be.visible");
  });
});
