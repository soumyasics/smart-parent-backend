const Complaint = require('./rpcomplaintSchema')
const councilorComplaint = require('./councilorComplaintSchema')

const addRPComplaint = (req, res) => {


  const complaint = new Complaint({
    userId: req.body.userId,
    rpId: req.body.freelancerId,
    complaint: req.body.complaint
  });

  complaint.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json(error);

    } else {
      res.status(201).json({
        message: "complaint added  successfully",
        data: complaint,
      });
    }
  })
}

const viewAllComplaintsForRPRemoval = (req, res) => {
  Complaint.find({ actionTaken: 'warningsend' })
    .populate('rpId')
  exec().
    then((complaints) => {
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
  Complaint.find({ actionTaken: 'pending' })
    .populate('rpId')
    .exec().
    then((complaints) => {
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
  Complaint.findByIdAndUpdate({ _id: req.params.id }, { actionTaken: 'warningsend' })
    .exec().
    then((complaints) => {
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
    .exec().
    then((complaints) => {
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


const viewComplaints = (req, res) => {
  Complaint.find({})
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

// -------------------------------------------------------------------------------


const addCouncilorComplaint = (req, res) => {


  const complaint = new councilorComplaint({
    userId: req.body.userId,
    cId: req.body.freelancerId,
    complaint: req.body.complaint
  });

  complaint.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json(error);

    } else {
      res.status(201).json({
        message: "complaint added  successfully",
        data: complaint,
      });
    }
  })
}

const viewAllComplaintsForCouncilorRemoval = (req, res) => {
  councilorComplaint.find({ actionTaken: 'warningsend' })
    .populate('cId')
  exec().
    then((complaints) => {
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
  councilorComplaint.find({ actionTaken: 'pending' })
    .populate('cId')
    .exec().
    then((complaints) => {
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
  councilorComplaint.findByIdAndUpdate({ _id: req.params.id }, { actionTaken: 'warningsend' })
    .exec().
    then((complaints) => {
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
  councilorComplaint.findByIdAndDelete({ _id: req.params.id })
    .exec().
    then((complaints) => {
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





module.exports = {
  addRPComplaint,
  viewAllComplaintsForRPRemoval,
  viewComplaintsToBeRectified,
  viewComplaints,
  sendWarningtoRP,
  deleteComplaintById,
  addCouncilorComplaint,
  viewAllComplaintsForCouncilorRemoval,
  viewComplaintsToBeRectifiedforcouncilor,
  sendWarningtocouncilor,
  deletecouncilorComplaintById
}
