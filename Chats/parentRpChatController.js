const chat = require("./parentrpchat");

const chattingParentRp = async (req, res) => {
  const { rpid, parentid, content, sender } = req.body;

  // Create a new message
  const message = new chat({
    rpid: rpid,
    parentid: parentid,
    content: content,
    sender: sender,
  });
  await message
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewChatRecipientsforParentId = (req, res) => {
  chat
    .find({ parentid: req.params.id })
    .populate("rpid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        let rps = [];
        data.map((x) => {
          rps.push(x.rpid);
        });
        const uniqueRps = [...new Set(rps)];
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: uniqueRps,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
const viewChatRecipientsforRPId = (req, res) => {
  chat
    .find({ rpid: req.params.id })
    .populate("parentid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        parents = [];
        data.map((x) => {
          parents.push(x.parentid);
        });
        const uniqueParents = [...new Set(parents)];
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: uniqueParents,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
const viewChatBerweenParentAndRp = (req, res) => {
  console.log("inps", req.body);
  let rpid = req.body.rpid;
  let parentid = req.body.parentid;
  chat
    .find({
      $or: [
        { rpid: rpid, parentid: parentid },
        { rpid: parentid, parentid: rpid },
      ],
    })
    .sort({ createdAt: 1 })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

const getChatBetweenParentAndRp = async (req, res) => {
  const { rpid, parentid } = req.body;
  try {
    const data = await chat.find({ rpid: rpid, parentid: parentid });
    return res.status(200).json({
      message: "Data obtained successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error on get chat between parent and rp",
      data: err,
    });
  }
};
const getAllChats = async (req, res) => {
  try {
    const data = await chat.find();
    return res.status(200).json({
      message: "Data obtained successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error on get chat between parent and rp",
      data: err,
    });
  }
};

module.exports = {
  chattingParentRp,
  viewChatRecipientsforParentId,
  viewChatRecipientsforRPId,
  viewChatBerweenParentAndRp,
  getChatBetweenParentAndRp, getAllChats
};
