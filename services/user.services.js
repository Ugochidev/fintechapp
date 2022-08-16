const db = require("../db/db");
const AppError = require("../utils/appError");
const { successResMsg, errorResMsg } = "../utils/response.js";
// get all users
const getAllUsers = async () => {
  try {
    const users = await db("user").select("*");
    return users;
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// create user account with data as a parameter
const createAccount = async (data, authData) => {
  try {
    let accountNumberGenerator = [];
    for (i = 0; i < 10; i++) {
      num = Math.floor(Math.random() * 9);
      accountNumberGenerator.push(num);
      accountNumberGen = accountNumberGenerator.join("");
    }
    const { accountholder, accountNumber, balance, userId } = data;
    const userBankAccount = await db("wallet").insert({
      accountholder,
      accountNumber: accountNumberGen,
      balance,
      userId,
    });
    return userBankAccount;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

// fund user account balance
const fundAccount = async (paramsData, bodyData,) => {
  try {
    const { id } = paramsData;
    const { amountToFund } = bodyData;
    const fundUserWallet = await db("wallet")
      .leftJoin("user", "user.id", "wallet.userId")
      .select("balance")
      .from("wallet")
      .where({ userId: id });
    if (!fundUserWallet.length) {
      throw new AppError("Account not found", 404);
    }
    // update wallet balance field with amountToFund
    const newBalance = fundUserWallet[0].balance + bodyData.amountToFund;
    await db("wallet").where({ id: id }).update({
      balance: newBalance,
    });
    return newBalance;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 500);
  }
};

const transferMoney = async (paramsData, bodyData) => {
  try {
    const { senderId, receiverId } = paramsData;
    const { amountToTransfer } = bodyData;
    // get the sender details
    const sender = await db
      .select("balance")
      .from("wallet")
      .where({"id" :senderId});
    // check if the amountToTransfer is greater than the sender balance
    if (amountToTransfer > sender[0].balance) {
      throw new AppError("Insufficient funds", 400);
    }
    // find receiver account by the account id
    const receiver = await db
      .select("balance")
      .from("wallet")
      .where({"id":receiverId});
    receiver[0].balance += parseInt(amountToTransfer);
    await db("wallet").where({"id": receiverId}).update({
      balance: receiver[0].balance,
    });
    // remove the amount send the from the other user account
    sender[0].balance -= parseInt(amountToTransfer);
    await db("wallet").where("id", senderId).update({
      balance: sender[0].balance,
    });
    return receiver;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

const withdrawMoney = async (bodyData, paramsData) => {
  try {
    const { amountToWithdraw } = bodyData;
    const { id } = paramsData;
    console.log("amountToWithdraw:", amountToWithdraw);
    const findUserBalance = await db
      .select("balance")
      .from("wallet")
      .where({"id": id});
    if (amountToWithdraw > findUserBalance[0].balance) {
      throw new AppError("Insufficient funds", 400);
    }
    const newBalance = findUserBalance[0].balance - amountToWithdraw;
    await db("wallet").where("id", id).update({
      balance: newBalance,
    });
    return parseInt(amountToWithdraw);
  } catch (error) {
  throw new AppError(error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  createAccount,
  fundAccount,
  transferMoney,
  withdrawMoney,
};
