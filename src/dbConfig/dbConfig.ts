import mongoose from "mongoose";

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      // these options are not mandatory in Mongoose v7+,
      // but safe to include for older versions
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
}
export default connectToDatabase;
