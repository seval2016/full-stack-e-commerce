const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// Yeni bir kategori oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// Tüm kategorileri getirme (Read- All)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori ID'sine göre kategori getirme (Read - One)
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori güncelleme (Update)
router.put("/:categoryId", async (req, res) =>
  {
    try {
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

// Kategori silme (Delete)
router.delete("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    await Category.findByIdAndDelete(req.params.categoryId);

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
