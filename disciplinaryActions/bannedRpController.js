const BannedRpModel = require("./bannedRpSchema");

const banRp = async (req, res) => {
  try {
    const { rpId, bannedComplaintId } = req.body;
    if (!rpId || !bannedComplaintId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isRpAlreadyExists = await BannedRpModel.findOne({
      rpId,
    });
    if (isRpAlreadyExists) {
      return res.status(409).json({ message: "Resource Person is already banned" });
    }

    const bannedRp = new BannedRpModel({
      rpId: req.body.rpId,
      bannedComplaintId: req.body.bannedComplaintId,
    });
    await bannedRp.save();
    res.status(200).json({
      message: "Resource Person banned successfully",
      data: bannedRp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

const unBanRp = async (req, res) => {
  try {
    const { rpId } = req.body;
    if (!rpId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const bannedRp = await BannedRpModel.findOne({ rpId });
    if (!bannedRp) {
      return res.status(401).json({ message: "RP is not banned yet." });
    }
    const unBanRp = await BannedRpModel.findOneAndDelete({
      rpId: req.body.rpId,
    });
    res.status(200).json({
      message: "Resource person unbanned successfully",
      data: unBanRp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

const viewAllBannedRPs = async (req, res) => {
  try {
    const bannedRPs = await BannedRpModel.find({})
      .populate("rpId")
      .populate("bannedComplaintId");
    res.status(200).json({
      message: "All banned rps",
      data: bannedRPs,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

const viewBannedRpById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ message: "RP id is required." });
    }
    if (!(id.length === 24)) {
      return res.status(401).json({ message: "RP id is not valid." });
    }
    const bannedRp = await BannedRpModel.findById(id);
    if (!bannedRp) {
      return res
        .status(404)
        .json({ message: "RP not available on the banned list." });
    }
    return res.status(200).json({
      message: "Banned R P",
      data: bannedRp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
const viewBannedRpByRpId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ message: "RP id is required." });
    }
    if (!(id.length === 24)) {
      return res.status(401).json({ message: "RP id is not valid." });
    }

    const bannedRp = await BannedRpModel.find({ rpId: id });

    if (bannedRp.length === 0) {
      return res
        .status(404)
        .json({ message: "RP not available on the banned list." });
    }

    return res.status(200).json({
      message: "Banned R P",
      data: bannedRp[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  banRp,
  viewAllBannedRPs,
  unBanRp,
  viewBannedRpById,
  viewBannedRpByRpId,
};
