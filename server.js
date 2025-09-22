const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running 🚀" });
});

// API Routes
const routes = require("./routes/routes");
app.use("/api/v1", routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose runtime error:", err);
});
