const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const farmerRoutes = require("./routes/farmer.routes");
const buyerRoutes = require("./routes/buyer.routes");
const pricingRoutes = require("./routes/pricing.routes");

const app = express();

app.use(cors({
  origin: 'https://frontend-theta-seven-99.vercel.app',
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/admin/pricing", pricingRoutes);
app.use("/farmers", farmerRoutes);
app.use("/buyers", buyerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

module.exports = app;
