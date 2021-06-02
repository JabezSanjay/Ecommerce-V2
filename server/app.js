const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const razorPaymentRoutes = require("./routes/razorpayPayment");

const localDb = process.env.LOCAL_DATABASE;
const productionDb = process.env.PROD_DATABASE;
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

//DB Connection
mongoose
  .connect(productionDb, {
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
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", razorPaymentRoutes);

//Port
const port = process.env.PORT || 8000;

//Server Start
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
