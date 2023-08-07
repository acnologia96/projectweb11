const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String,text:true },
    description: { type: String },
    price: { type: Number },
    images: { type: Array },
    category: { type: ObjectId, ref: "category" },
    quantity: { type: Number },
    size: { type: String },
    color: { type: String },
    gender: { type: String },
    sold: { type: Number,default:0 },
  },
  { timestamps: true },
);
module.exports = Product = mongoose.model("product", ProductSchema);
