const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { fullName, email, password, address, contact, role, bio } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName: fullName,
      email: email,
      address: address,
      contact: contact,
      bio: bio,
      role: role,
      password: hashedPassword,
    });

    const registeredUser = await newUser.save();
    res.status(200).json({
      message: "User Registered Successfully",
      newUser: registeredUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email: email, role: role });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password do not match" });
    }

    const token = jwt.sign(
      {
        fullName: user?.fullName,
        email: user?.email,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ message: "Login Successfull", loggedInUser: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  // function for getting all users
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    res
      .status(200)
      .json({ message: "All Users Fetched Successfully", users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.handleDeleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.handleEditUsers = async (req, res) => {
  const userId = req.params.id;
  const { fullName, email, password, address, contact, role, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.fullName = fullName;
    user.email = email;
    user.password = hashedPassword;
    user.address = address;
    user.contact = contact;
    user.role = role;
    user.bio = bio;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
