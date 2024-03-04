const SubscribeModel = require("./subscribeSchema");
const mongoose = require("mongoose");
const getAllSubscriptions = async () => {
  try {
    const getAllSubscription = await SubscribeModel.find();
    return getAllSubscription;
  } catch (error) {
    console.log("error on allsubscriptions", error);
    return [];
  }
};

const newSubscribe = async (req, res) => {
  try {
    const parentId = req.body.parentId;
    const resourcePersonId = req.body.resourcePersonId;
    const acHolderName = req.body.acHolderName;
    const cardNumber = req.body.cardNumber;
    const expiryDate = req.body.expiryDate;
    const cvv = req.body.cvv;
    const amount = req.body.amount;

    if (!parentId) {
      return res.status(400).json({ message: "Parent Id is required" });
    }
    console.log("par", parentId);

    if (!resourcePersonId) {
      return res
        .status(400)
        .json({ message: "Resource Person Id is required" });
    }

    console.log("par2", parentId);
    // console.log("parent ojb", parentIdObj);
    const allSubscriptions = await getAllSubscriptions();

    const isAlreadySubscribed = allSubscriptions.find((subscription) => {
      let convertParentId = subscription?.parentId?.toString() || "";
      let convertResourcePersonId =
        subscription?.resourcePersonId?.toString() || "";

      return (
        convertParentId === parentId &&
        convertResourcePersonId === resourcePersonId
      );
    });
    if (isAlreadySubscribed) {
      return res
        .status(400)
        .json({ message: "You already subscribed this Resource Person." });
    }

    const subscribe = await new SubscribeModel({
      parentId,
      resourcePersonId,
      acHolderName,
      cardNumber,
      expiryDate,
      cvv,
      amount,
    });
    await subscribe.save();
    return res
      .status(201)
      .json({ message: "Subscription created successfully", data: subscribe });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on subscribe", error });
  }
};

const getAllSubscription = async (req, res) => {
  try {
    const getAllSubscription = await SubscribeModel.find()
      .populate("parentId")
      .populate("resourcePersonId");
    return res
      .status(200)
      .json({ message: "All Subscription", data: getAllSubscription });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on get all subscribe", error });
  }
};

const getAllSubscriptionByParentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const getAllSubscription = await SubscribeModel.find({ parentId: id })
      .populate("parentId")
      .populate("resourcePersonId");
    return res
      .status(200)
      .json({ message: "All Subscription", data: getAllSubscription });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on get all subscribe", error });
  }
};

const getAllSubscriptionByRpId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const getAllSubscription = await SubscribeModel.find({
      resourcePersonId: id,
    })
      .populate("parentId")
      .populate("resourcePersonId");
    return res
      .status(200)
      .json({ message: "All Subscription", data: getAllSubscription });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on get all subscribe", error });
  }
};

module.exports = {
  newSubscribe,
  getAllSubscription,
  getAllSubscriptionByParentId,
  getAllSubscriptionByRpId,
};
