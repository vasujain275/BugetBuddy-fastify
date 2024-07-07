export const PORT = Number.parseInt(process.env.PORT || "8069", 10);
export const DB_URL = process.env.DB_URL as string;
export const DB_AUTH_TOKEN = process.env.DB_AUTH_TOKEN as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as string;
export const COOKIE_SECRET_KEY = process.env.COOKIE_SECRET_KEY as string;
