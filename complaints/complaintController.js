const Complaint = require("./rpcomplaintSchema");
const CounselorComplaintModel = require("./councilorComplaintSchema");

const addRPComplaint = async (req, res) => {
  const { parentId, rpId, complaint } = req.body;
  if (!parentId || !rpId || !complaint) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newcomplaint = new Complaint({
    parentId: req.body.parentId,
    rpId: req.body.rpId,
    complaint: req.body.complaint,
  });
  await newcomplaint.save();
  res.status(201).json({
    message: "complaint added  successfully",
    data: newcomplaint,
  });
};
const viewComplaints = (req, res) => {
  Complaint.find({})
    .populate("parentId")
    .populate("rpId")
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const viewAllComplaintsForRPRemoval = (req, res) => {
  Complaint.find({ actionTaken: "warningsend" })
    .populate("rpId")
    .populate("parentId");
  exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const viewComplaintsToBeRectified = (req, res) => {
  Complaint.find({ actionTaken: "pending" })
    .populate("rpId")
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const sendWarningtoRP = (req, res) => {
  Complaint.findByIdAndUpdate(
    { _id: req.params.id },
    { actionTaken: "warningsend" }
  )
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints updated successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const deleteComplaintById = (req, res) => {
  Complaint.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

// -------------------------------------------------------------------------------

const addCouncilorComplaint = async (req, res) => {
  const { parentId, cId, complaint } = req.body;
  if (!parentId || !cId || !complaint) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newcomplaint = new CounselorComplaintModel({
    parentId: req.body.parentId,
    cId: req.body.cId,
    complaint: req.body.complaint,
  });
  await newcomplaint.save();
  res.status(201).json({
    message: "complaint added  successfully",
    data: newcomplaint,
  });
};

const viewAllCouncilorComplaints = async (req, res) => {
  
  CounselorComplaintModel.find({})
      .populate("parentId")
      .populate("cId")
      .then((complaints) => {
        res.status(200).json({
          message: "Complaints retrieved successfully",
          data: complaints,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error retrieving complaints",
          error: err,
        });
      });
 
};
const viewAllComplaintsForCouncilorRemoval = (req, res) => {
  CounselorComplaintModel.find({ actionTaken: "warningsend" }).populate("cId");
  exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const viewComplaintsToBeRectifiedforcouncilor = (req, res) => {
  CounselorComplaintModel.find({ actionTaken: "pending" })
    .populate("cId")
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const sendWarningtocouncilor = (req, res) => {
  CounselorComplaintModel.findByIdAndUpdate(
    { _id: req.params.id },
    { actionTaken: "warningsend" }
  )
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints updated successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const deletecouncilorComplaintById = (req, res) => {
  CounselorComplaintModel.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};

const viewComplaintsAgainstCounselor = (req, res) => {
  Complaint.find({})
    .populate("parentId")
    .populate("cId")
    .then((complaints) => {
      res.status(200).json({
        message: "Complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


module.exports = {
  addRPComplaint,
  viewComplaints,
  viewComplaintsAgainstCounselor,
  addCouncilorComplaint,
  viewAllComplaintsForRPRemoval,
  viewComplaintsToBeRectified,
  sendWarningtoRP,
  deleteComplaintById,
  viewAllComplaintsForCouncilorRemoval,
  viewComplaintsToBeRectifiedforcouncilor,
  sendWarningtocouncilor,
  deletecouncilorComplaintById,viewAllCouncilorComplaints
};
