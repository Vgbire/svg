import vue from '@vitejs/plugin-vue'
const path = require('path')

export default {
  plugins: [vue()],
  resolve: {
    alias: { '@': path.join(__dirname, 'src') }
  }
}