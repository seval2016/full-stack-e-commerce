const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// Yeni bir ürün oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { name, img, reviews, description, colors, sizes, price, category } =
      req.body;

    const newProduct = new Product({
      name,
      img,
      reviews,
      description,
      colors,
      sizes,
      price,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm ürünleri getirme (Read- All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün ID'sine göre ürün getirme (Read - One)
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "category"
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün güncelleme (Update)
router.put("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Ürün silme (Delete)
router.delete("/:productId", async (req, res) =>
    {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
        return res.status(404).json({ error: "Product not found." });
        }
    
        await Product.findByIdAndDelete(req.params.productId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
    }
);


module.exports = router;
