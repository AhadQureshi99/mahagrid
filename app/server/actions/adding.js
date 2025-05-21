"use server";

import { connectDB } from "../connect";
import Product from "../models/productModel";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const addUser = async (formData) => {
  await connectDB();

  if (!formData) {
    return { error: "Form data is required" }; // Return early if no formData
  }

  const { username, email, password } = Object.fromEntries(formData);

  try {
    // Check if the email already exists in the database
    const userExist = await User.findOne({ email });

    if (userExist) {
      return { error: "Email is already in use." }; // Email already exists
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("User Added Successfully");
    return {
      success: "User registered successfully!",
      user: { username: newUser.username, email: newUser.email }, // Return user details after successful registration
    };
  } catch (error) {
    console.error("Error in adding user: ", error);
    return { error: "An error occurred. Please try again later." }; // General error handling
  }
};

export const SignIn = async (email, password) => {
    await connectDB(); // Ensure database is connected
  
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("Invalid Email");
    }
  
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, findUser.password);
  
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
  
    // If password matches, return user details
    return {
      username: findUser.username,
      email: findUser.email,
    };
  };


  
export const addProduct = async (formData) => {
  await connectDB();

  if (!formData) {
    return { error: "Form data is required" };
  }

  const {
    productname,
    productdescription,
    productbaseprice,
    productdiscountedprice,
    productgender,
    productimages,
    productcategory,
  } = Object.fromEntries(formData);

  try {
    // Directly create product without checking for uniqueness
    const newProduct = await Product.create({
      productname,
      productdescription,
      productbaseprice,
      productdiscountedprice,
      productgender,
      productimages,
      productcategory,
    });

    console.log("Product Added Successfully");

    return {
      success: "Product added successfully!",
      product: {
        id: newProduct._id,
        productname: newProduct.productname,
        productcategory: newProduct.productcategory,
      },
    };
  } catch (error) {
    console.error("Error in adding product: ", error);
    return { error: "An error occurred. Please try again later." };
  }
};


