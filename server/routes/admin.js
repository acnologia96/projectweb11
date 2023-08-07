const express = require("express");
const router = express.Router();

const { auth, adminCheck } = require("../middleware/auth");

const { changStatusOrder,getOrderAdmin } = require("../controllers/admin");

//@Endpoint  http://localhost:5000/api/admin/order-status
router.put("/admin/order-status", auth,adminCheck, changStatusOrder);
router.get("/admin/orders", auth,adminCheck, getOrderAdmin);


module.exports = router;
