const express = require("express");
require("dotenv").config();
require("./db/connection");
const v1Router = require("./routes/v1/v1Router");
const { RequestLoggerMiddleware } = require("./middleware/authMiddleware");
const cors = require("cors");

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env[`${NODE_ENV}_PORT`] || 8080;

const server = express();

server.use(express.json());
server.use(cors());
server.use(RequestLoggerMiddleware);

server.use("/api/v1", v1Router);

server.listen(PORT, () => {
  console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`);
});
