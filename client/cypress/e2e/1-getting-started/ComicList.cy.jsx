describe("ComicList - E2E Tests", () => {
  // Giả lập dữ liệu API cho danh sách truyện
  beforeEach(() => {
    cy.viewport("macbook-16");
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
                name: "Comic 1",
                thumb_url: "thumb1.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 1",
                    chapter_api_data: "/api/chapter/1",
                  },
                ],
              },
              {
                _id: "2",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
              {
                _id: "3",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
              {
                _id: "4",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
              {
                _id: "5",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
              {
                _id: "6",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
              {
                _id: "7",
                slug: "comic-2",
                name: "Comic 2",
                thumb_url: "thumb2.jpg",
                chaptersLatest: [
                  {
                    chapter_name: "Chapter 2",
                    chapter_api_data: "/api/chapter/2",
                  },
                ],
              },
            ],
          },
        },
      }
    ).as("getComicsData");

    cy.visit("http://localhost:5173/");
  });

  it("should display loading message when fetching data", () => {
    cy.visit("http://localhost:5173/");
    cy.get("p").should("contain", "Đang tải dữ liệu...");
  });

  it("should display the comics list correctly", () => {
    // Đợi dữ liệu trả về từ API
    cy.wait("@getComicsData");

    // Kiểm tra xem danh sách truyện có được hiển thị không
    cy.get(".comic-item").should("have.length", 7);

    // Kiểm tra xem các thẻ img và tên truyện có được hiển thị đúng không
    cy.get(".comic-item .comic-image")
      .first()
      .should(
        "have.attr",
        "src",
        "https://otruyenapi.com/uploads/comics/thumb1.jpg"
      );
    cy.get(".comic-item .comic-title").first().should("contain", "Comic 1");
  });

  it("should navigate to the correct comic page when clicked", () => {
    cy.wait("@getComicsData");

    // Kiểm tra điều hướng đến trang truyện
    cy.get(".comic-item .comic-title").first().click();
    cy.url().should("include", "/comic/comic-1");
  });

  it("should navigate to the correct chapter when clicked", () => {
    cy.wait("@getComicsData");

    // Kiểm tra điều hướng đến trang chapter
    cy.get(".comic-item .chapters a").first().click();
    cy.url().should("include", "/read/1");
  });
});
