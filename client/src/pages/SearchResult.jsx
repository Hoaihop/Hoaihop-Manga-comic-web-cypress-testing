import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/SearchResult.css"; // Sử dụng CSS mới

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim() || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hàm tìm kiếm và xử lý lỗi
  useEffect(() => {
    if (keyword) {
      setLoading(true);
      setError(""); // Reset error message when starting new search

      fetch(
        `https://otruyenapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(
          keyword
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data?.data?.items?.length > 0) {
            setResults(data.data.items);
          } else {
            setResults([]); // Nếu không có kết quả, trả về mảng rỗng
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Không thể tải kết quả tìm kiếm, vui lòng thử lại sau.");
          setLoading(false);
        });
    } else {
      // Nếu từ khóa trống, không tìm kiếm và reset kết quả
      setResults([]);
      setLoading(false);
    }
  }, [keyword]);

  return (
    <div className="search-result-wrapper">
      <h2>
        Kết quả tìm kiếm:{" "}
        {keyword ? keyword : "Bạn chưa nhập từ khóa tìm kiếm."}
      </h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : results.length > 0 ? (
        <div className="comics">
          {results.map((comic) => (
            <div key={comic.slug} className="comic-item">
              <img
                src={`https://otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                alt={comic.name}
                className="comic-image"
              />
              <h3 className="comic-title">{comic.name}</h3>
              <p>Tác giả: {comic.author.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>
          Không tìm thấy kết quả nào cho từ khóa &quot;{keyword}&quot;. Vui lòng
          thử lại với từ khóa khác.
        </p>
      )}
    </div>
  );
};

export default SearchResult;
