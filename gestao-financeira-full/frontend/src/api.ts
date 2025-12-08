import axios from "axios";

export default axios.create({
  // Colocamos o link direto aqui
  baseURL: "https://gestao-financeira-flxl.onrender.com/api"
});
