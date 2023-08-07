const Order = require("../models/Order");

exports.changStatusOrder = async (req, res) => {
  try {
    const {orderId,orderStatus}=req.body
    const orderUpdate =await Order.findByIdAndUpdate(
        orderId,
        {orderStatus},
        {new:true}
    )
        res.send(orderUpdate)
  } catch (err) {
    res.status(500).send("Update Status Error!!");
  }
};

exports.getOrderAdmin = async (req, res) => {
  try {
    let order = await Order.find()
      .populate("products.product")
      .populate("orderBy","username firstname lastname")
      .exec();
    res.json(order)
    console.log(order)
  } catch (err) {
    res.status(500).send("get Order Error");
  }
};