import { SuccessResponse, FailureResponse } from "../common.js";
import _ from "lodash";
import pro from "../services.js";

export const addProductController = async (req, res) => {
  try {
    const newProduct = await pro.addProduct(req);
    res.json(SuccessResponse("Product added successfully", 200, newProduct));
  } catch (error) {
    console.log(error);
    res.status(500).json(FailureResponse("Product not addedd", 500));
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await pro.getProducts();
    if (_.isEmpty(products)) {
      res.status(202).json(SuccessResponse("No Products Found", 202, products));
    } else {
      res.json(
        SuccessResponse("Products returned successfully", 200, products)
      );
    }
  } catch {
    res.status(500).json(FailureResponse("Internal Server Error", 500));
  }
};

export const updateProductController = async (req, res) => {
  try {
    const newProduct = await pro.updateProduct(req, res);
    if (!newProduct) {
      res.status(400).json(FailureResponse("Product not found", 400));
    } else {
      res.json(
        SuccessResponse("Product Updated successfully", 200, newProduct)
      );
    }
  } catch {
    res.status(500).json(FailureResponse("Something Went Wrong", 500));
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const result = await pro.getProductbyId(req);
    if (_.isEmpty(result)) {
      res.status(202).json(SuccessResponse("No Product Found", 202, result));
    } else {
      res.json(SuccessResponse("Product returned successfully", 200, result));
    }
  } catch {
    res.status(500).json(FailureResponse("Internal Server Error", 500));
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const result = await pro.deleteProduct(req);
    if (!result) {
      res.status(400).json(FailureResponse("Product not found", 400));
    } else {
      res.json(SuccessResponse("Product Deleted successfully", 200, null));
    }
  } catch {
    res.status(500).json(FailureResponse("Internal Server Error", 500));
  }
};
