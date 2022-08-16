const db = require("../db/db");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const createUser = async (data) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = data;
    //  hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const newUser = await db("user").insert({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
    });
  
  } catch (error) {
   throw new AppError(error.message, 500);
  }
};

// create a login with data as a parameter
const login = async (data) => {
  try {
    if (!data.email || !data.password) {
      throw new AppError("Please provide all required fields", 400);
    }
    const user = await db("user").select("*").where("email", data.email);
    // check if the user exists
    if (!user.length) {
      throw new AppError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compareSync(
      data.password,
      user[0].password
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 400);
    }
    return user;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
module.exports = { createUser, login };
