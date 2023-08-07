const { json } = require("body-parser");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    //const { name } = req.body;
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error!!");
  }
};
exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error!!");
  }
};
/*exports.list = async (req, res) => {
  const calSkip = (page, size) => {
    return (page - 1) * size;
  };

  const calPage = (count, size) => {
    return Math.ceil(count / size);
  };
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 3;
    const [_results, _count] = await Promise.all([
      Product.find()
        .skip(calSkip(page, size))
        .limit(size)
        .exec(),
        Product.countDocuments().exec()
    ]);
    return res.json({
      currentPage: page,
      pages: calPage(_count, size),
      currentCount: _results.length,
      totalCount: _count,
      product: _results
    });

  } catch (err) {
    res.status(500).send("Create Product Error!!");
  }
};*/

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndRemove({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Remove Product Error!!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Read Product Error!!");
  }
};
exports.update = async (req, res) => {
  try {
    //code
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    //err
    res.status(500).send("Update Product Error!!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("ListBy Product Error!!");
  }
};

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate(
    "category",
    "_id name"
  );
  res.send(products);
};
const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: { $gte: price[0], $lte: price[1] },
  }).populate("category", "_id name");
  res.send(products);
};
const handleCategory = async (req, res, category) => {
  let products = await Product.find({category}).populate(
    "category",
    "_id name"
  );
  res.send(products);
};
exports.searchFilters = async (req, res) => {
  const { query, price,category } = req.body;
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
  if (price) {
    console.log("price-->", price);
    await handlePrice(req, res, price);
  }
  if (category) {
    console.log("category-->", category);
    await handleCategory(req, res, category);
  }
};
