// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://yogendraray100:yogi123@cluster0.96p539w.mongodb.net/secondbackend?retryWrites=true&w=majority&appName=Cluster0";

// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

const AuthorRoutes = require('./routes/author');
app.use("/api/author", AuthorRoutes);

const BookRoutes = require('./routes/book');
app.use("/api/book", BookRoutes);

const CategoryRoutes = require('./routes/category_routes');
app.use("/api/category", CategoryRoutes);

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
