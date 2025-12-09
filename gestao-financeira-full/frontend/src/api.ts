// frontend/src/api.ts

import axios from "axios";

export default axios.create({
  // 💡 CORREÇÃO: Removemos o "/api" daqui, pois ele será adicionado no RegisterPage.tsx
  // A URL deve ser EXATAMENTE a do seu Web Service do Render.
  baseURL: "https://gestao-financeira-flxl.onrender.com" 
});
