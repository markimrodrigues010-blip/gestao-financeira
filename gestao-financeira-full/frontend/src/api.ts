// frontend/src/api.ts

import axios from "axios";

// 💡 CORREÇÃO FINAL: Garante que a URL inclui a porta se necessário
export default axios.create({
  // Use a URL completa do seu Web Service do Render + o caminho /api
  // A URL deve ser EXATAMENTE a do seu Backend.
  baseURL: "https://gestao-financeira-flxl.onrender.com/api" 
});
