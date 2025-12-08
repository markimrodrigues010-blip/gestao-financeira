import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Adicionando a configuração de saída explicitamente
  build: {
    outDir: 'dist' 
  }
})
