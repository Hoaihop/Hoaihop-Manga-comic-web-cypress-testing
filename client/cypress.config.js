import { defineConfig } from "cypress";
import vitePreprocessor from "@cypress/vite-dev-server";

export default defineConfig({
  projectId: "danwi9",
  e2e: {
    setupNodeEvents(on, config) {
      // Cài đặt các sự kiện NodeJS (nếu cần)
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // Sử dụng vitePreprocessor để hỗ trợ Vite trong Cypress
      viteConfig: {
        // Cấu hình Vite tùy chỉnh nếu cần (nếu không có thể bỏ qua)
      },
    },
    supportFile: false, // Có thể tắt support file nếu không cần
  },
});
