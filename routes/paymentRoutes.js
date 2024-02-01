const express = require("express");

const router = express.Router();

const paymentControllers = require("../controllers/paymentControllers");

router.post("/order", paymentControllers.postOrder);

router.post("/order/validate", paymentControllers.postOrderValidate);

router.post("/redeem", paymentControllers.redeemGiftCard);

router.get("/getKey", paymentControllers.getKey);

module.exports = router;
