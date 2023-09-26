import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://172.17.10.154:8080',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //     }
  //   }
  // }
})
