import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

// Caminho onde o site é publicado. Para GitHub Pages em
// https://francamargo.github.io/francamargosite/ use '/francamargosite/'.
// Para domínio próprio ou repositório francamargo.github.io, use '/'
// (e ajuste segmentsToKeep para 0 em public/404.html).
export default defineConfig({
  base: '/francamargosite/',
  plugins: [react()],
})
