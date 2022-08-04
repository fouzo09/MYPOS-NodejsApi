const express = require("express");
const {
        createProduct,
        getProducts,
        getProduct,
        updateProduct,
        deleteProduct
    } = require("./src/controllers/product.js");

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.get("/:productID", getProduct);
productRouter.put("/:productID", updateProduct);
productRouter.delete("/:productID", deleteProduct);

module.exports = productRouter;