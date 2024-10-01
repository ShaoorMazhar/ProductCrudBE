import Express from "express";

import {
  addProductController,
  getProductByIdController,
  updateProductController,
  getProductsController,
  deleteProductController,
} from "../controllers/products.js";
import { validateRequest, productSchema } from "../middleware/validator.js";
const router = Express.Router();

router
  .route("/addProduct")
  .post(validateRequest(productSchema), addProductController);
router.route("/getProducts").get(getProductsController);
router.route("/getProduct/:id").get(getProductByIdController);
router
  .route("/updateProduct/:id")
  .put(validateRequest(productSchema), updateProductController);
router.route("/deleteProduct/:id").delete(deleteProductController);
export default router;
