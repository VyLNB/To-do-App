import dotenv from "dotenv";
dotenv.config({ path: "./secrets/.env.local" });

const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_PORT: process.env.APP_PORT,
  APP_PUBLIC_PORT: process.env.APP_PUBLIC_PORT,
  APP_HOST: process.env.APP_HOST,
  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET_SIGNATURE || process.env.JWT_SECRET 
};

export default env;