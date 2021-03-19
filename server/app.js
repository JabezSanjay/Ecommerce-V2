const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const localDb = process.env.DATABASE;

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB Connection
mongoose
  .connect(localDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//Port
const port = process.env.port || 8000;

//Server Start
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
