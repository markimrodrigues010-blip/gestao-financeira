// frontend/src/api.ts

import axios from "axios";

export default axios.create({
  // URL completa do Backend, SEM o /api no final
  baseURL: "https://gestao-financeira-flxl.onrender.com" 
});
