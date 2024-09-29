import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
