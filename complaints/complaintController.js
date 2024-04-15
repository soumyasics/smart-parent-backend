const Complaint=require('./complaintSchema')

const addComplaint=(req,res)=>{


const complaint = new Complaint({
    from: req.body.from,
    userId: req.body.userId,
    freelancerId: req.body.freelancerId,
    complaint: req.body.complaint
  });
  
  complaint.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json(error);

    } else {
        res.status(201).json({
            message: "Freelancer registered successfully",
            data: freelancer,
          });
        }
  })
}

const viewAllComplaintsForRemoval = (req, res) => {
    Complaint.find({actionTaken:'warningsend'})
     .populate('rpId')
     .populate('cId').
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
    Complaint.find({actionTaken:'pending' })
    .populate('rpId')
     .populate('cId').
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

module.exports={addComplaint,
    viewAllComplaintsForRemoval,
viewComplaintsToBeRectified,
viewComplaints}
  