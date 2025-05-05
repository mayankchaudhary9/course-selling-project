const express = require("express");
const mongoose = require("mongoose");

// imports routes
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://chaudharymayank5800:TcbmR1H148OrLlzU@cluster0.t8zmvmg.mongodb.net/course-selling-app"
  );
  app.listen(3000);
  console.log("listening on port 3000...");
}

main();
