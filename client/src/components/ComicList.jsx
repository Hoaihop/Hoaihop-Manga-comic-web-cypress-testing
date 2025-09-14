import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../styles/ComicList.css";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(100); // Giả sử có 100 trang
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.items) {
          setComics(data.data.items);
        } else {
          console.error("Không có dữ liệu truyện");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePagination = (page) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(
        <button key="ellipsis-start" disabled>
          ...
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePagination(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <button key="ellipsis-end" disabled>
          ...
        </button>
      );
    }

    pages.push(
      <button
        key={totalPages}
        onClick={() => handlePagination(totalPages)}
        className={currentPage === totalPages ? "active" : ""}
      >
        {totalPages}
      </button>
    );

    return pages;
  };

  return (
    <div className="comic-list">
      <h2>Danh sách truyện mới</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="comics">
          {comics.length > 0 ? (
            comics.map((comic) => (
              <div key={comic._id} className="comic-item">
                {/* Thêm Link để điều hướng */}
                <Link to={`/comic/${comic.slug}`}>
                  <img
                    src={`https://otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                    alt={comic.name}
                    className="comic-image"
                  />
                </Link>
                <Link to={`/comic/${comic.slug}`}>
                  <h3 className="comic-title">{comic.name}</h3>
                </Link>
                <div className="chapters">
                  <h4>Chương mới:</h4>
                  {comic.chaptersLatest?.length > 0 ? (
                    comic.chaptersLatest.slice(0, 3).map((chapter, index) => (
                      <p key={index}>
                        <a
                          href={`/read/${chapter.chapter_api_data
                            .split("/")
                            .pop()}`}
                        >
                          {chapter.chapter_name}
                        </a>
                      </p>
                    ))
                  ) : (
                    <p>Không có chương mới</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Không có dữ liệu truyện</p>
          )}
        </div>
      )}

      <div className="pagination-container">
        <div className="pagination">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {renderPagination()}

          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicList;
