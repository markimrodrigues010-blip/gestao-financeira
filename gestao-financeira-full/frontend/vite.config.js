import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 💡 ADICIONE ESTA LINHA: Garante que os caminhos de assets comecem em /
  base: '/', 
  // Fim da adição
  // Adicionando a configuração de build explícita
  build: {
    outDir: 'dist' // Garante que a pasta de saída seja 'dist'
  }
})
