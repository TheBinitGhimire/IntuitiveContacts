import "dotenv/config";

let config = {
  env: process.env.NODE_ENV,
  port: 1337,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET || "JUUbsv3gneJD7qutq6PPcWZLHOGwZ",
  jwtTime: 10
};

export default config;
