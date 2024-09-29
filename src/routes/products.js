import Express from "express";
import {
  addProductController,
  getProductByIdController,
  updateProductController,
  getProductsController,
  deleteProductController,
} from "../controllers/products.js";
const router = Express.Router();

router.route("/addProduct").post(addProductController);
router.route("/getProducts").get(getProductsController);
router.route("/getProduct/:id").get(getProductByIdController);
router.route("/updateProduct/:id").put(updateProductController);
router.route("/deleteProduct/:id").delete(deleteProductController);
export default router;
