const bcrypt = require("bcrypt");
const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { z } = require("zod");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
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

    await userModel.create({
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

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
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
      JWT_USER_PASSWORD
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

userRouter.get("/purchases", jserMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  res.json({
    purchases,
  });
});

module.exports = {
  userRouter: userRouter,
};
