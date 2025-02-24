import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import axios from "axios";

export const createUser = async (req, res) => {
  const { username, email, password, bio, interests } = req.body;

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save sensitive data in the database
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  // Forward non-sensitive data to Backend 2
  try {
    const response = await axios.post(`${process.env.BACKEND2_URL}/profile`, {
      userId: newUser._id,
      bio,
      interests,
    });
    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "Error forwarding data to Backend 2:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Failed to forward non-sensitive data",
      error: error.response?.data || error.message, // Log actual error message
    });
  }
};

export const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const profileResponse = await axios.get(
      `${process.env.BACKEND2_URL}/profile/${req.params.id}`
    );

    // Combine data from both backends
    const combinedData = {
      username: user.username,
      email: user.email,
      bio: profileResponse.data.bio,
      interests: profileResponse.data.interests,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to aggregate data", error });
  }
};
