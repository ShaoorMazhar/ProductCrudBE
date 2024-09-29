import Express from "express";
import productRoutes from "./routes/products.js";
import { connectToDB } from "./models/db.js";

const app = Express();
app.use(Express.json());

const startServer = async () => {
  try {
    connectToDB();
    app.use("/", productRoutes);
    app.listen(3000, () => {
      console.log("Server is listening on localhost:3000");
    });
  } catch (err) {
    console.log("Failed connecting to the DB:", err);
  }
};

startServer();
