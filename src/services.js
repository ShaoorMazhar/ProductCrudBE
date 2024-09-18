import { generateHexId, SuccessResponse, FailureResponse } from "./common.js";
import _ from "lodash";

export const addProduct = (app, collection) => {
  app.post("/addProduct", async (req, res) => {
    try {
      const { title, amount } = req.body;
      const newProduct = {
        _id: generateHexId(),
        title,
        amount,
      };
      await collection.insertOne(newProduct);
      res.json(SuccessResponse("Product added successfully", 200, newProduct));
    } catch {
      res.status(500).json(FailureResponse("Product not addedd", 500));
    }
  });
}; // add product

export const getProducts = (app, collection) => {
  app.get("/getProducts", async (req, res) => {
    try {
      const result = await collection.find({}).toArray();
      if (_.isEmpty(result)) {
        res.status(202).json(SuccessResponse("No Products Found", 202, result));
      } else {
        res.json(
          SuccessResponse("Products returned successfully", 200, result)
        );
      }
    } catch {
      res.status(500).json(FailureResponse("Internal Server Error", 500));
    }
  });
}; // get all products

export const getProductbyId = (app, collection) => {
  app.get("/getProduct/:id", async (req, res) => {
    try {
      const { id } = req?.params;
      const result = await collection.findOne({ _id: id });
      if (_.isEmpty(result)) {
        res.status(202).json(SuccessResponse("No Product Found", 202, result));
      } else {
        res.json(SuccessResponse("Product returned successfully", 200, result));
      }
    } catch {
      res.status(500).json(FailureResponse("Internal Server Error", 500));
    }
  });
}; // get product by id

export const updateProduct = (app, collection) => {
  app.put("/updateProduct/:id", async (req, res) => {
    try {
      const { title, amount } = req.body;
      const { id } = req.params;
      const newProduct = {
        title,
        amount,
      };
      const foundProduct = await collection.findOne({ _id: id });
      if (foundProduct) {
        await collection.updateOne({ _id: id }, { $set: newProduct });
        res.json(
          SuccessResponse("Product Updated successfully", 200, newProduct)
        );
      } else {
        res.status(400).json(FailureResponse("Product not found", 400));
      }
    } catch {
      res.status(500).json(FailureResponse("Something Went Wrong", 500));
    }
  });
}; // Update product

export const deleteProduct = (app, collection) => {
  app.delete("/deleteProduct/:id", async (req, res) => {
    try {
      const { id } = req?.params;
      const foundProduct = await collection.findOne({ _id: id });
      if (foundProduct) {
        await collection.deleteOne({ _id: id });
        res.json(SuccessResponse("Product Deleted successfully", 200, null));
      } else {
        res.status(400).json(FailureResponse("Product not found", 400));
      }
    } catch {
      res.status(500).json(FailureResponse("Internal Server Error", 500));
    }
  });
}; //delete Product
