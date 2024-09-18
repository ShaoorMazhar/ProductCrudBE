import Express from "express";
import { MongoClient } from "mongodb";
import {
  getProducts,
  addProduct,
  updateProduct,
  getProductbyId,
  deleteProduct,
} from "./services.js";

const app = Express();
const mongoUrl = "mongodb://localhost:27017";
const connection = new MongoClient(mongoUrl);
app.use(Express.json());
const startServer = async () => {
  try {
    const connected = await connection.connect();
    console.log("connected to db");
    const db = connected.db("ProductCrud");
    const collection = db.collection("Products");
    getProducts(app, collection);
    addProduct(app, collection);
    updateProduct(app, collection);
    getProductbyId(app, collection);
    deleteProduct(app, collection);
    app.listen(3000, () => {
      console.log("port is listening at localhost 3000");
    });
  } catch (err) {
    console.log("Failed connecting to the db", err);
  }
};

startServer();
