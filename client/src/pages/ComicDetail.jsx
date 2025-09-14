// In ComicDetail Component
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import "../styles/ComicDetail.css";

const ComicDetail = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await fetch(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        const data = await response.json();
        if (data?.data) {
          setComic(data.data.item);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comic details:", error);
        setLoading(false);
      }
    };

    fetchComicDetail();
  }, [slug]);

  if (loading) return <p>Đang tải thông tin truyện...</p>;
  if (!comic) return <p>Không tìm thấy truyện</p>;

  const { name, thumb_url, author, category, chapters, content, status } =
    comic;

  return (
    <div className="comic-detail-page">
      <div className="comic-detail-info">
        <img
          src={`https://otruyenapi.com/uploads/comics/${thumb_url}`}
          alt={name}
          className="comic-detail-image"
        />
        <div className="comic-detail-text">
          <h2>{name}</h2>
          <p>
            <strong>Tác giả:</strong>{" "}
            {author && author.length > 0 ? author.join(", ") : "Đang cập nhật"}
          </p>
          <p>
            <strong>Thể loại:</strong>{" "}
            {category && category.length > 0
              ? category.map((cat) => cat.name).join(", ")
              : "Đang cập nhật"}
          </p>
          <p>
            <strong>Mô tả:</strong>{" "}
            {content ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            ) : (
              "Đang cập nhật"
            )}
          </p>
          <p>
            <strong>Tình trạng:</strong>{" "}
            {status === "ongoing" ? "Đang cập nhật" : "Hoàn thành"}
          </p>
          <p>
            <strong>Số chương:</strong>{" "}
            {chapters?.[0]?.server_data?.length || 0}
          </p>
        </div>
      </div>

      <div className="comic-action-buttons">
        <button className="comic-action-button">Đọc từ đầu</button>
        <button className="comic-action-button">Đọc mới nhất</button>
      </div>

      <div className="comic-chapter-list">
        <h3>Danh sách chương</h3>
        <ul>
          {chapters?.[0]?.server_data?.map((chapter, index) => (
            <li key={index}>
              <Link to={`/read/${chapter.chapter_api_data.split("/").pop()}`}>
                Chương {index + 1}:{" "}
                {chapter.chapter_name || `Chương ${index + 1}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComicDetail;
