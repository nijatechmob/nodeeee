

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server Running On Port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();