
export const authConfig = {
  jwtSecret: (process.env.JWT_SECRET as string) || "senha-muito-segura",
  jwtExpiresIn: "8h",
};
