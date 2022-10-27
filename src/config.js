import { config } from "dotenv";
config();

module.exports = {
  port: process.env.PORT || 3000,
};
