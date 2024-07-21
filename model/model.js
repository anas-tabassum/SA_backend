const productModel = require("../schema/product");
const userModel = require("../schema/user");
const { deleteFile } = require("../utils/utils");

const addProductModel = async (data) => {
  let product = {};

  if (Array.isArray(data.images) && data.images.length > 0) {
    product = {
      ...data,
      images: data.images,
    };
  } else {
    product = {
      ...data,
      images: [],
    };
  }

  try {
    const newProduct = new productModel(product);
    const item = await newProduct.save();
    return item;
  } catch (error) {
    console.log("Something went wrong", error);
    return null;
  }
};

const loadProductsModel = async (id) => {
  try {
    const data = await productModel.find({ userId: id });
    return data;
  } catch (err) {
    console.error("Something went wrong", err);
    return null;
  }
};

const deleteProductModel = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (product && product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        if (image.filename) {
          deleteFile(image.filename);
        }
      });
    }
    const response = await productModel.deleteOne({ _id: id });
    return response;
  } catch (err) {
    console.error("Failed to delete product", err);
  }
};

const userLogin = async (data) => {
  const response = await userModel.findOne({
    username: data.username,
    password: data.password,
  });
  return response;
};

module.exports = {
  addProductModel,
  loadProductsModel,
  deleteProductModel,
  userLogin,
};
