import dotenv from 'dotenv';
dotenv.config()

export const BUSINESS_ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    CLIENT: "client",
    EMPLOYEE: "employee"
  }


export const {
    SERVER_HOST,
    SERVER_PORT,
    DATABASE_URL,
    SECURE_COOKIE,
    SAME_SITE,
    JWT_PRIVATE_KEY,
    JWT_ACCESS_EXPIRATION_TIME,
    JWT_REFRESH_EXPIRATION_TIME,
    EMAIL_NAME,
    EMAIL_USER,
    EMAIL_PASS,
    RECEIPIENT_EMAIL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    FRONTEND_MAIN_URL,
} = process.env

