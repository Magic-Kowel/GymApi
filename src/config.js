import { config } from "dotenv";
config();
export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'gym';

export const STATUS_ACTIVE = 1;
export const STATUS_DELETE = 2;


export const STATUS_TYPE_USER = 1;
export const STATUS_TYPE_ADMIND = 2;

export const GENERATION_NUMBER = 10;

export const SECRET_KEY = "123456789";
