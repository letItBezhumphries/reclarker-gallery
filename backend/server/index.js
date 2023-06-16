const express = require("express");
require("dotenv").config();
const connectDB = require("../mongo/index");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const artworkRoutes = require("../routes/artworkRoutes");
const userRoutes = require("../routes/userRoutes");
const orderRoutes = require("../routes/orderRoutes");
const exhibitRoutes = require("../routes/exhibitRoutes");
const uploadImageRoutes = require("../routes/uploadImageRoutes");
const s3uploadRoutes = require("../routes/s3uploadRoutes");
const artistRoutes = require("../routes/artistRoutes");

const { notFound, errorHandler } = require("../middleware/errorMiddleware");
const app = express();

//connect the database
connectDB();

//Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.text());
app.use(
  express.json({
    extended: false,
    //need the raw body to verify webhook signatures
    //compute only when req is hitting the stripe webhook endpoint
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/api/stripe/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-auth-token, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./public/uploads")));

/* mounting routes */
app.use("/api/artwork", artworkRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/exhibits", exhibitRoutes);
app.use("/api/upload", uploadImageRoutes);
app.use("/api/uploads3", s3uploadRoutes);

if (process.env.NODE_ENV === "production") {
  //serve production assets
  app.use(express.static("frontend/build"));

  // if it doesn't recognize route serve up index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
