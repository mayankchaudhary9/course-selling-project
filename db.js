const mongoose = require("mongoose");
console.log("connected to mongoose");
mongoose.connect(
  "mongodb+srv://chaudharymayank5800:TcbmR1H148OrLlzU@cluster0.t8zmvmg.mongodb.net/course-selling-app"
);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, Unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const adminSchema = new Schema({
  email: { type: String, Unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const courseSchema = new Schema({
  tittle: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
