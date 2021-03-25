const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const AWS = require("aws-sdk");
const Product = require("../models/product");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "Product not found!",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "There is a problem with the image!",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields!",
      });
    }

    let product = new Product(fields);

    const uploadFile = () => {
      if (file.photo) {
        fs.readFile(file.photo.path, (err, data) => {
          if (err) throw err;
          const params = {
            Bucket: "ecommerce-v2",
            Key: `${file.photo.name}`,
            Body: JSON.stringify(data, null, 2),
          };
          s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err;

            product.photo.url = data.Location;
            product.photo.name = data.Key;

            if (product.photo.url === undefined) {
              return res.status(400).json({
                error: "Please include the required fields",
              });
            }
            //save to the DB
            product.save((err, product) => {
              if (err || s3Err) {
                console.log(err);
                res.status(400).json({
                  error: "New product is not added!",
                });
              }
              res.json(product);
            });
          });
        });
      } else {
        //save to the DB
        product.save((err, product) => {
          if (product.url === undefined) {
            return res.status(400).json({
              error: "Please include the required fields",
            });
          }
          if (err) {
            res.status(400).json({
              error: "New product is not added!",
            });
          }
          res.json(product);
        });
      }
    };
    uploadFile();
  });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found!",
        });
      }
      res.json(products);
    });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "There is a problem with the image!",
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    const uploadFile = () => {
      if (file.photo) {
        fs.readFile(file.photo.path, (err, data) => {
          if (err) throw err;
          const params = {
            Bucket: "ecommerce-v2",
            Key: `${file.photo.name}`,
            Body: JSON.stringify(data, null, 2),
          };
          s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err;
            product.photo.url = data.Location;
            product.photo.name = data.Key;

            if (!product.photo.url || product.url === "undefined") {
              return res.status(400).json({
                error: "Please include the required fields",
              });
            }

            //save to the DB
            product.save((err, product) => {
              if (err || s3Err) {
                res.status(400).json({
                  error: "Updating the product failed!",
                });
              }
              res.json(product);
            });
          });
        });
      } else {
        //save to the DB
        product.save((err, product) => {
          if (err) {
            res.status(400).json({
              error: "Updating the product failed!",
            });
          }
          res.json(product);
        });
      }
    };
    uploadFile();
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: "Product is not deleted!",
      });
    }
    return res.json({
      message: `${deletedProduct.name} is deleted!`,
    });
  });
};
