const SubscribeModel = require("./subscribeSchema");



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

    if (!resourcePersonId) {
      return res
        .status(400)
        .json({ message: "Resource Person Id is required" });
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
