const express = require("express");
const router = express.Router();
const user = require("../Models/user");
const bcrypt = require("bcryptjs");

router.post("/createUser", async (req, res) => {
  try {
    const { userName, email, age } = req.body;
    const userAccount = new user({
      userName,
      email,
      age,
    });
    await userAccount.save();
    res.status(201).send(userAccount);
  } catch (error) {
    console.log("Error", error);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const { userName, email, age, password } = req.body;
    const varifyUser = await user.findOne({ userName: userName });
    if (varifyUser)
      return res
        .status(401)
        .json({ message: "User Already exist with this email" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new user({ userName, email, age, password: hashPassword });
    await newUser.save();
    return res
      .status(200)
      .json({ Message: "New User Created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/allUser", async (req, res) => {
  try {
    const age = req.body.age;
    const allUsers = await user.find({ age: { $lt: age } }).select("userName");
    res.status(201).json({ message: "List of Users", allUsers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/userCount", async (req, res) => {
  try {
    const count = await user.find({}).sort({ updatedAt: 1 });
    res.status(201).json({ message: "User Count is:", count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.put("/updateUserName/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { userName } = req.body;
    const updateUser = await user.findByIdAndUpdate(
      id,
      { userName },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json({ message: "user updated successfully", updateUser });
  } catch (error) {}
});

router.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUserId = await user.findByIdAndDelete(id);
    if (!deleteUserId) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {}
});

router.get("/findUserById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userId = await user.find(id);
    if (!userId) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json({ message: "User Found", userId });
  } catch (error) {
    console.log("Error", error);
    res.send(error);
  }
});

router.get("/test", (req, res) => {
  res.send("Testing...");
});

router.get("/findUser", async (req, res) => {
  const { userId } = req.body;
  // find user by email
  const findUser = await user.find({ userName: userId });
  console.log("findUser:", findUser);
  if (findUser) {
    console.log(findUser);
    res.send(findUser);
  } else {
    console.log("User Not Found", findUser);
  }
});

router.get("/findUserById/:id", async (req, res) => {
  const userId = req.params.id;
  const findId = await user.findById({ userId });
  if (findId) {
    res.send(findId);
  } else {
    console.log("User Not found", findId);
  }
});

module.exports = router;
