import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComicList from "./components/ComicList";
import ReaderPage from "./pages/ReaderPage";
import ComicDetail from "./pages/ComicDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Footer from "./components/Footer"; // Import Footer component
import SearchResult from "./pages/SearchResult";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <ComicList />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/read/:chapterId" element={<ReaderPage />} />
            <Route path="/comic/:slug" element={<ComicDetail />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </div>
        <Footer /> {/* Thêm Footer vào cuối trang */}
      </div>
    </Router>
  );
}

export default App;
