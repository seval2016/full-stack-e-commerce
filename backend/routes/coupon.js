const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

// Yeni bir kupon oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    const newCoupon = new Coupon({ code, discountPercent });
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
            const coupons = await Coupon.find();
            res.status(200).json(coupons);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
        }
    });

// Belirli bir kuponu getirme (Read - Single)
router.get("/:couponId", async (req, res) =>
    {
        try {
            const coupon = await Coupon.findById(req.params.couponId);
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
router.put("/:couponId", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    if (!code || discountPercent == null) {
      return res.status(400).json({ error: "Code and discountPercent are required." });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.couponId,
      { code, discountPercent },
      { new: true, runValidators: true }
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
router.delete("/:couponId", async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.couponId);
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
    const coupon = await Coupon.findOne({ code });
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