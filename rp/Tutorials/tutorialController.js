const tutorialSchema = require('./tutorialSchema');
<<<<<<< HEAD
const multer = require("multer");
=======
const multer = require('multer');
>>>>>>> 809cd4886c3494e1f42a93ef75a53da05e1ecabd

// Soumya


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload'); // Ensure that 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  }
});

const upload = multer({ storage: storage });
const addTutorial = (req, res) => {
    
    const newVideoTutorial = new tutorialSchema({
   
       
        title:req.body.title,
        description:req.body.description,
        thumbnail:req.files[0],
        video:req.files[1],
        rpid:req.body.rpid
    });

    newVideoTutorial.save()
        .then(videoTutorial => {
            res.status(201).json(videoTutorial);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Failed to add video tutorial.' });
        });
};

// Edit an existing video tutorial
const editVideoTutorial = (req, res) => {
   

    tutorialSchema.findByIdAndUpdate({_id:req.params.id}, {
        thumbnail:req.files[0],
        video:req.files[1],
        title:req.body.title,
        description:req.body.description

    }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};


// Delete an existing video tutorial
const deleteVideoTutorial = (req, res) => {
    const { id } = req.params;

    tutorialSchema.findByIdAndDelete(id)
        .then(deletedVideoTutorial => {
            if (!deletedVideoTutorial) {
                return res.json({status:401, message: 'Video tutorial not found.' });
            }
            res.json({status:200,  message: 'Video tutorial deleted successfully.' });
        })
        .catch(error => {
            console.error(error);
            res.json({status:500,  message: 'Failed to delete video tutorial.' });
        });
};

module.exports = {
    addTutorial,
    editVideoTutorial,
    deleteVideoTutorial,
    upload
};
