const { Router } = require("express");
const { adminModel } = reqiure("../db");
const adminRouter = Router();

app.post("/signup", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

app.post("/signin", function (req, res) {
  res.json({
    message: "signin endpoint",
  });
});

app.post("/course", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

app.put("/course", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

app.get("/course/bulk", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
