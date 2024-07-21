import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log(" database connection successfull");
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

export { connectdb };
