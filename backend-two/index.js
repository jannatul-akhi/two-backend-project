import express from "express";
import profileRoute from "./routes/profile.route.js";
import connectDB from "./lib/connectDB.js";

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/profile", profileRoute);

app.use("/", (req, res) => {
  res.send("server 2 is running");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  re.json({
    message: error.message || "something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(4000, () => {
  connectDB();
  console.log("Backend server is running");
});
