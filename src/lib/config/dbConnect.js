import mongoose from "mongoose";
export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`The database is connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
    mongoose.disconnect();
    process.exit(1);
  }
};
