import axios from "axios";

// Hàm lấy dữ liệu truyện từ API
export const fetchHomeData = async () => {
  try {
    const response = await axios.get("https://otruyenapi.com/v1/api/home");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
