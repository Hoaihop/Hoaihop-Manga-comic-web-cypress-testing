describe("SearchResult - E2E Tests", () => {
  // Giả lập kết quả tìm kiếm thành công
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=react",
      {
        statusCode: 200,
        body: {
          data: {
            items: [
              {
                slug: "comic-1",
                name: "React Comic 1",
                thumb_url: "thumb1.jpg",
                author: ["Author 1"],
              },
              {
                slug: "comic-2",
                name: "React Comic 2",
                thumb_url: "thumb2.jpg",
                author: ["Author 2"],
              },
            ],
          },
        },
      }
    ).as("searchResults");
    cy.visit("http://localhost:5173/search?keyword=react"); // URL giả sử của trang tìm kiếm
  });

  it("should show loading message while fetching search results", () => {
    cy.visit("http://localhost:5173/search?keyword=react");
    cy.get("p").should("contain", "Đang tải dữ liệu...");
  });

  it("should display search results correctly", () => {
    cy.wait("@searchResults");
    cy.get(".comic-item").should("have.length", 2); // Kiểm tra có 2 kết quả
    cy.get(".comic-title").first().should("contain", "React Comic 1");
    cy.get(".comic-item .comic-image")
      .first()
      .should(
        "have.attr",
        "src",
        "https://otruyenapi.com/uploads/comics/thumb1.jpg"
      );
  });

  it("should display no results message when no comics are found", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=noresult",
      {
        statusCode: 200,
        body: {
          data: {
            items: [],
          },
        },
      }
    ).as("noResults");

    cy.visit("http://localhost:5173/search?keyword=noresult");
    cy.wait("@noResults");
    cy.get("p").should(
      "contain",
      'Không tìm thấy kết quả nào cho từ khóa "noresult". Vui lòng thử lại với từ khóa khác.'
    );
  });

  it("should display error message when the API request fails", () => {
    cy.intercept(
      "GET",
      "https://otruyenapi.com/v1/api/tim-kiem?keyword=error",
      {
        statusCode: 500,
        body: {},
      }
    ).as("errorRequest");

    cy.visit("http://localhost:5173/search?keyword=error");
    cy.wait("@errorRequest");
    cy.get(".error-message").should(
      "contain",
      "Không thể tải kết quả tìm kiếm, vui lòng thử lại sau."
    );
  });

  it("should not perform search when no keyword is provided", () => {
    cy.visit("http://localhost:5173/search");
    cy.get("h2").should(
      "contain",
      "Kết quả tìm kiếm: Bạn chưa nhập từ khóa tìm kiếm."
    );
    cy.get(".comics").should("not.exist"); // Không hiển thị kết quả nào
  });
});
