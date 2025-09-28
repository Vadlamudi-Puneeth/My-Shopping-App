require("dotenv").config();
require("./config/db");

// Set default environment variables for local development
process.env.JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
process.env.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3333;
const app = express();

// Enable CORS (specific frontend or all)
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use((req,res,next) => {
  setTimeout(() => {
    next();
  },2000)
})

app.use(morgan("dev"));
app.use(express.json()); // body-parser in json format

app.use(cookieParser());

// Mount all API routes
app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
