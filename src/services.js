import _ from "lodash";
import ProductModel from "./models/productModel.js";
import registerationModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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

export class UserService {
  registerUser = async (req) => {
    const { userName, email, password } = req.body;
    const existedUser = await registerationModel.findOne({ email: email });
    if (existedUser) {
      return false;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await new registerationModel({
      userName,
      email,
      password: hashedPassword,
    }).save();
    return newUser;
  };

  siginUser = async (req) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const findUser = await registerationModel.findOne({ email });
    if (!findUser) {
      return "notFound";
    }
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return "passIncorrect";
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { id: findUser._id, email: findUser.email },
      },
      JWT_SECRET
    );

    return { user: findUser, token };
  };
}
