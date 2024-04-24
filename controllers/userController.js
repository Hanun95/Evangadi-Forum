import { dbConn } from "../db/dbConfig.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !firstname || !lastname || !username) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const [user] = await dbConn.query(
      "SELECT username, userid FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await dbConn.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }

  res.send({ username, firstname, lastname, email, password });
};

export const login = async (req, res) => {
  res.send("User logged in successfully");
};

export const checkUser = async (req, res) => {
  res.send("check user");
};
