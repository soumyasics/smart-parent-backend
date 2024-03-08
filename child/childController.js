const ChildModel = require("./childSchema");

const viewAllChilds = async (req, res) => {
  const allChilds = await ChildModel.find({}).populate("parentId");
  return res.status(200).json({ data: allChilds });
};

module.exports = {
  viewAllChilds,
};
