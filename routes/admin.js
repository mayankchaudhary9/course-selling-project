const bcrypt = require("bcrypt");
const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { z } = require("zod");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const requirebody = z.object({
    email: z.string().min(2).max(100).email(),
    password: z.string().min(4).max(50),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
  });

  const parsesDataWithSuccess = requirebody.safeParse(req.body);

  if (!parsesDataWithSuccess.success) {
    res.json({
      message: "incorrect format",
      error: parsesDataWithSuccess.error,
    });
    return;
  }
  const { email, password, firstName, lastName } = req.body;

  let errorThrow = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (e) {
    res.json({
      message: "user already exists",
    });
    errorThrow: true;
  }

  if (!errorThrow) {
    res.json({
      message: "signin successful",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await adminModel.findOne({
    email,
  });

  if (!user) {
    res.status(403).json({
      message: "user does not exists in db..",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log(passwordMatch);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: " incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "course endpoint",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "course endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
