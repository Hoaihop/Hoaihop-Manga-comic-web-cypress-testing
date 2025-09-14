import React, { useEffect, useState, useCallback } from "react";
import { fetchHomeData } from "../utils/api";
import "../styles/Home.css";

function Home() {
  const [featuredComics, setFeaturedComics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHomeData();
        setFeaturedComics(data.data.seoOnPage.og_image || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (featuredComics.length === 0) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredComics]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuredComics.length) % featuredComics.length
    );
  }, [featuredComics.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredComics.length);
  }, [featuredComics.length]);

  const comicsToShow = [];
  for (let i = 0; i < 5; i++) {
    comicsToShow.push(
      featuredComics[(currentIndex + i) % featuredComics.length]
    );
  }

  return (
    <div className="home-container">
      {/* Tiêu đề nằm riêng biệt */}
      <div className="slider-title-wrapper">
        <h2 className="slider-title">Truyệndex - Đề cử truyện</h2>
      </div>

      {/* Slider */}
      <div className="featured-comics">
        <button className="prev-btn" onClick={goToPrev}>
          &#8592;
        </button>
        <div className="featured-comics-slider">
          <div className="featured-comics-track">
            {comicsToShow.map((comic, index) => (
              <div key={index} className="featured-comic">
                <img
                  src={`https://otruyenapi.com${comic}`}
                  alt={`Featured Comic ${index + 1}`}
                  className="featured-comic-image"
                />
              </div>
            ))}
          </div>
        </div>
        <button className="next-btn" onClick={goToNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Home;
