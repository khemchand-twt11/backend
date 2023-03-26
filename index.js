const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const { authMiddleware } = require("./middlewares/auth");
const { todoRoute } = require("./routes/todos.routes");
const { userRoute } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ msg: "home page" });
});
app.use("/user", userRoute);
app.use(authMiddleware);
app.use("/todo", todoRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to the db`);
  } catch (error) {
    console.log(error);
    console.log("couldn not connect to the database");
  }
  console.log(`server is running at port ${process.env.PORT}`);
});
