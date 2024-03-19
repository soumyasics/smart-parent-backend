const cchat = require("./parentcouncilorchat");

const chattingParentCouncilor = async (req, res) => {
  const { cid, parentid, content, sender } = req.body;

  // Create a new message
  const message = new cchat({
    cid: cid,
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
  cchat
    .find({ parentid: req.params.id })
    .populate("cid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        let councilors = [];
        data.map((x) => {
          councilors.push(x.rpid);
        });
        const uniquecouncilors = [...new Set(councilors)];
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: uniquecouncilors,
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
const viewChatRecipientsforCId = (req, res) => {
  cchat
    .find({ cid: req.params.id })
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
const viewChatBetweenParentAndCouncilors = (req, res) => {
  console.log("inps", req.body);
  let cid = req.body.cid;
  let parentid = req.body.parentid;
  cchat
    .find({
      $or: [
        { cid:cid, parentid: parentid },
        { cid: parentid, parentid: cid },
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

const getChatBetweenParentAndcouncilor = async (req, res) => {
  const { cid, parentid } = req.body;
  try {
    const data = await cchat.find({ cid: cid, parentid: parentid });
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
    const data = await cchat.find();
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
  chattingParentCouncilor,
  viewChatRecipientsforParentId,
  viewChatRecipientsforCId,
  viewChatBetweenParentAndCouncilors,
  getChatBetweenParentAndcouncilor,
   getAllChats
};
