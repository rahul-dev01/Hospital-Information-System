const express = require("express");
require("dotenv").config();
require("./db/connection");
const v1Router = require("./routes/v1/v1Router");
const cors = require("cors");

const PORT = process.env[`${process.env.NODE_ENV || "development"}_PORT`] || 8080;

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/v1", v1Router);

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
