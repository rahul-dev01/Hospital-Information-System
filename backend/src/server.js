const express = require('express')
require('dotenv').config()
require("./db/connection")
const hospitalRoutes = require("./routes/hospitalRoutes");
const authRouters = require("./routes/authRoutes")

const cors = require("cors")

const NODE_ENV = process.env.NODE_ENV

const PORT = process.env[`${NODE_ENV}_PORT`]
const server = express()

server.use(express.json())
server.use(cors())

server.use("/api/v1/auth", authRouters);
server.use("/api/v1/hospitals", hospitalRoutes);

server.listen(PORT, ()=>{
    console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
})