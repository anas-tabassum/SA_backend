const {
  addProductModel,
  loadProductsModel,
  deleteProductModel,
  userLogin,
} = require("../model/model");

const addProduct = async (data, res) => {
  const response = await addProductModel(data);
  if (response) {
    res.json({
      status: "success",
      message: "Successfully added new product",
    });
  } else {
    res.json({
      status: "fail",
      message: "Failed to add new product",
    });
  }
};

const loadProducts = async (userId, res) => {
  const response = await loadProductsModel(userId);
  if (response) {
    res.json({
      status: "success",
      products: response,
    });
  } else {
    res.json({
      status: "fail",
      message: "Failed to add new product",
    });
  }
};

const deleteProduct = async (id, res) => {
  const response = await deleteProductModel(id);
  if (response) {
    res.json({
      status: "success",
    });
  } else {
    res.json({
      status: "fail",
      message: "Failed to add new product",
    });
  }
};

const loginHandler = async (data, res) => {
  const response = await userLogin(data);

  if (response) {
    res.json({
      status: "success",
      message: "User authincated successfully",
      data: response,
    });
  } else {
    res.json({
      status: "fail",
      message: "Failed to authincate user",
    });
  }
};

module.exports = {
  addProduct,
  loadProducts,
  loginHandler,
  deleteProduct,
};
