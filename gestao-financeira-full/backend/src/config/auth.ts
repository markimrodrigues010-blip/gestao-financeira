
export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || "senha-muito-segura",
  jwtExpiresIn: "8h",
};
