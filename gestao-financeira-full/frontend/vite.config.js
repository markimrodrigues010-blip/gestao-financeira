import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Adicionando a configuração de build explícita
  build: {
    outDir: 'dist' // Garante que a pasta de saída seja 'dist'
  }
})
