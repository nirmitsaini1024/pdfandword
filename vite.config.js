// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  plugins: [
    react(), 
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@pdftron/webviewer/public/*',
          dest: 'lib/webviewer'
        },
        {
          src: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
          dest: 'public/'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['@react-pdf-viewer/core', 'pdfjs-dist']
  }
})