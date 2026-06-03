import { User } from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, age, email, skills, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const user = new User({ name, age, email, skills, address });
    const savedUser = await user.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    //const users = await User.find({ age: { $gt: 25 } }); //! fetching users with age greater than 25
    const users = await User.find({
      age: { $lte: 35 },
      // "address.state": { $in: ["Punjab", "Rajasthan"] },
      skills: { $in: ["JavaScript", "Node.js"] },
    });
    return res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

//? Get match user by agregation
export const getUsersByAggregation = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: { age: { $gt: 25 } },
      },
    ]);
    return res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

//? Get grouped user by aggregation
export const getGroupedUsersByAggregation = async (req, res) => {
  try {
    const users = await User.aggregate([
      // {
      //   $match: { age: { $gt: 25 } },
      // },
      {
        $group: {
          _id: ["$address.state", "$address.city"],
          count: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

//? Get projected user by aggregation
export const getProjectedUsersByAggregation = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          email: "$email",
          city: "$address.city",
          _id: "$address.state",
        },
      },
    ]);
    return res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

//? Full pipeline user by aggregation
export const getFullPipelineUsersByAggregation = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: { age: { $gt: 25 } },
      },
      {
        $group: {
          _id: ["$address.state", "$address.city"],
          count: { $sum: 1 },
          email: { $push: "$email" },
        },
      },
      {
        $project: {
          city: { $arrayElemAt: ["$_id", 1] },
          state: { $arrayElemAt: ["$_id", 0] },
          email: { $arrayElemAt: ["$email", 0] },
          count: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({ userCount: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
