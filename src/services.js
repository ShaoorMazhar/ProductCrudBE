import _ from "lodash";
import ProductModel from "./models/productModel.js";
class ProductService {
  addProduct = async (req) => {
    const { title, amount } = req.body;
    const newProduct = await new ProductModel({ title, amount }).save();
    return newProduct;
  }; // add product

  getProducts = async () => {
    const result = await ProductModel.find({});
    return result;
  }; // get all products

  updateProduct = async (req) => {
    const { title, amount } = req.body;
    const { id } = req.params;
    const newProduct = {
      title,
      amount,
    };
    const foundProduct = await ProductModel.findById(id);
    console.log(foundProduct, "foundProduct");
    if (!foundProduct) {
      return false;
    }
    const result = await ProductModel.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return result;
  }; // Update product

  getProductbyId = async (req) => {
    const { id } = req?.params;
    const result = await ProductModel.findById(id);
    return result;
  }; // get product by id

  deleteProduct = async (req) => {
    const { id } = req?.params;
    const foundProduct = await ProductModel.findById(id);
    if (!foundProduct) {
      return false;
    }
    const result = await ProductModel.findByIdAndDelete(id);
    return result;
  }; //delete Product
}
export default new ProductService();
