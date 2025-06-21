const express = require("express");
const router = express.Router();
const Category = require("../models/Coupon.js");

// Yeni bir kupon oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    const newCoupon = new Category({ code, discountPercent });
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm kuponları getirme (Read - All)
router.get("/", async (req, res) =>
    {
        try {
            const coupons = await Category.find();
            res.status(200).json(coupons);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
        }
    });

// Belirli bir kuponu getirme (Read - Single)
router.get("/:id", async (req, res) =>
    {
        try {
            const coupon = await Category.findById(req.params.id);
            if (!coupon) {
                return res.status(404).json({ error: "Coupon not found." });
            }
            res.status(200).json(coupon);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
        }
    });

// Kuponu güncelleme (Update)
router.put("/:id", async (req, res) =>
    {
        try {                   
            const { code, discountPercent } = req.body;
            const updatedCoupon = await Category.findByIdAndUpdate(
                req.params.id,
                { code, discountPercent },
                { new: true }
            );

            if (!updatedCoupon) {
                return res.status(404).json({ error: "Coupon not found." });
            }

            res.status(200).json(updatedCoupon);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
        }
    });

// Kuponu silme (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const deletedCoupon = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    res.status(200).json({ message: "Coupon deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kupon kodunu doğrulama
router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Category.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});



module.exports = router;