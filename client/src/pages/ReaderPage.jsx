import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ReaderPage.css"; // Import file CSS

const ReaderPage = () => {
  const { chapterId } = useParams(); // Lấy chapterId từ URL
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(chapterId); // Lưu trạng thái chương được chọn

  // Hàm lấy dữ liệu chương
  const fetchChapterData = useCallback(async () => {
    console.log("Fetching chapter with ID:", selectedChapter); // Log chapterId
    try {
      const response = await axios.get(
        `https://sv1.otruyencdn.com/v1/api/chapter/${selectedChapter}`
      );
      console.log("API response:", response.data); // Log API response

      if (response.data.status === "success") {
        const { domain_cdn, item } = response.data.data;
        // Tạo đường dẫn đầy đủ tới các trang truyện
        const chapterImages = item.chapter_image.map(
          (img) => `${domain_cdn}/${item.chapter_path}/${img.image_file}`
        );
        setImages(chapterImages);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chapter data: ", error);
      setLoading(false);
    }
  }, [selectedChapter]); // Hàm này sẽ được tạo lại khi selectedChapter thay đổi

  // Khi selectedChapter thay đổi, gọi hàm lấy dữ liệu chapter
  useEffect(() => {
    if (selectedChapter) {
      fetchChapterData(); // Fetch dữ liệu cho chapter hiện tại
    }
  }, [selectedChapter, fetchChapterData]); // Thêm fetchChapterData vào dependency array

  return (
    <div>
      {/* Chỉ hiển thị combobox khi dữ liệu đã tải xong */}
      {!loading && (
        <div className="chapter-select-container">
          <label htmlFor="chapterSelect">Chọn chương: </label>
          <select
            id="chapterSelect"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
          >
            <option value="">Chọn chương:</option>
          </select>
        </div>
      )}

      {/* Hiển thị hình ảnh */}
      <div className="images-container">
        {loading ? (
          <p>Đang tải chương...</p> // Chỉ hiện khi đang tải
        ) : images.length > 0 ? (
          images.map((src, index) => (
            <img key={index} src={src} alt={`Page ${index + 1}`} />
          ))
        ) : (
          <p>Không có hình ảnh để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default ReaderPage;
