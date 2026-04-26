const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const farmerRoutes = require("./routes/farmer.routes");
const buyerRoutes = require("./routes/buyer.routes");
const pricingRoutes = require("./routes/pricing.routes");

const app = express();

// ✅ CORS CONFIG (FIXED)
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-theta-seven-99.vercel.app"
];


// ✅ MIDDLEWARE
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-theta-seven-99.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options("*", cors());

// ✅ ROUTES
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/admin", adminRoutes);
app.use("/admin/pricing", pricingRoutes);
app.use("/farmers", farmerRoutes);
app.use("/buyers", buyerRoutes);

// ✅ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

module.exports = app;