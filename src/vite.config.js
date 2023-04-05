import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 设置 index.html 缓存为 no-cache
        headers: {
          "Cache-Control": "no-cache",
        },
      },
    },
  },
});
