import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: ['favicon.svg', 'robots.txt', 'icons.svg', 'react.svg', 'vite.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'icono.png'],
    workbox:{
      navigateFallback: "/index.html",
      globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"]
    },
    manifest: {
      name: "Control de Gastos Diarios",
      short_name: "GastosApp",
      description: "Aplicación para registrar y controlar tus gastos diarios de forma rápida y sencilla",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#00000000",

      screenshots: [
        {
          src: '/img/gastos.png',
          sizes: '512x512',
          type: "image/png",
          form_factor: "narrow"
        },
        {
          src: '/img/gastos-desktop.png',
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide"
        }
      ]
      ,
      icons: [
        {
          src: '/img/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icono.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/img/icono.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]

    }
  })],
})