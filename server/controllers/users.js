const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // Code
    var { id, password } = req.body.values;
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let user = await User.findOne({ username: req.user.username }).exec();
    let products = [];
    let cartClear = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartClear) {
      cartClear.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();

    console.log(newCart);
    res.send("usercart OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("User Cart Error");
  }
};
exports.getuserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("getUserCart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const {firstname,lastname,tell}=req.body
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address },
    ).exec();
    res.json({ ok: true });
    console.log(userAddress)
  } catch (err) {
    res.status(500).send("Save Address Error");
  }
};
exports.saveOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const userCart = await Cart.findOne({ orderBy: user._id }).exec();
    const order = await new Order({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();
    // +sold  -quantity
    const bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(bulkOption, {});
    res.send(updated);
  } catch (err) {
    res.status(500).send("Save Order Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const order = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .exec();

   
    res.json(order);
  } catch (err) {
    res.status(500).send("getOrder Error");
  }
};

exports.ClearCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const clear = await Cart.findOneAndRemove({ orderBy: user._id }).exec();
    res.send(clear);
  } catch (err) {
    res.status(500).send("Clear Cart Error");
  }
};

exports.addToWishList = async(req,res)=>{
  try{
    //code
    const { productId } = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('Add Wishlist Error')
  }
}
exports.getWishList = async(req,res)=>{
  try{
    //code
    let list = await User
    .findOne({username:req.user.username})
    .select('wishlist')
    .populate('wishlist')
    .exec()
    res.json(list)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}
exports.removeWishList = async(req,res)=>{
  try{
    const { productId } = req.params
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$pull:{wishlist: productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}