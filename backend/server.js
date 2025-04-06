const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
require("./config/passport");
const userDataRoute = require("./routes/userDataRoute");
const addPlanRoute = require("./routes/addPlanRoute");
const deletePlanRoute = require("./routes/deletePlanRoute");
const plansRoute = require("./routes/findAllPlansRoute");
const editPlanRoute = require("./routes/editPlanRoute");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", userDataRoute);
app.use("/api/newPlan", addPlanRoute);
app.use("/api/plans", plansRoute);
app.use("/api/delete", deletePlanRoute);
app.use("/api/edit", editPlanRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
