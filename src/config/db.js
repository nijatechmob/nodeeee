// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying MongoDB...");
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Mongo Error:", error.message);
    throw error;
  }
};

module.exports = connectDB;