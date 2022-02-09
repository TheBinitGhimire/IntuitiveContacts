import "dotenv/config";

let config = {
  env: process.env.NODE_ENV,
  port: 1337,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET || "JUUbsv3gneJD7qutq6PPcWZLHOGwZ",
  jwtTime: 60,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

export default config;
