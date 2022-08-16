const userServices = require("../services/user.services");
const { successResMsg, errorResMsg } = require("../utils/response");

// get all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    const dataInfo = {
      message: "Users retrieved successfully",
      users,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const createWallet = async (req, res) => {
  try {
    const result = await userServices.createAccount(req.body, req.user);
    const dataInfo = {
      message: "User bank account created successfully",
      result,
    };
    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const fundWallet = async (req, res, next) => {
  try {
    const result = await userServices.fundAccount(
      req.params,
      req.body,
      req.user
    );
    // message if the acount is not found
    if (!result) {
      return next(new AppError("Account Not Found!", 404));
    }
    const dataInfo = {
      message: "User bank account funded successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const transferFunds = async (req, res, next) => {
  try {
    const result = await userServices.transferMoney(req.params, req.body);
    console.log("controller test", result);
    const dataInfo = {
      message: "User bank account transferred successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const withdrawFunds = async (req, res, next) => {
  try {
    const result = await userServices.withdrawMoney(req.body, req.params);
    // message for withdraw success
    const dataInfo = {
      message: "The withdraw was  successful",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
module.exports = {
  fetchAllUsers,
  createWallet,
  fundWallet,
  transferFunds,
  withdrawFunds,
};
