const blogSchema = require("./blogSchema");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const addBlog = (req, res) => {

  const newBlog = new blogSchema({
    para1: req.body.para1,
    para2: req.body.para2,
    title: req.body.title,
    rpid: req.body.rpid,
    img: req.files[0],
  });
  newBlog
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err.stack,
      });
    });
};

//View   blogs by  id

const viewBlogsById = (req, res) => {
  blogSchema
    .findById({ _id: req.params.id })
    .populate("rpid")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//View  all blogs

const viewAllBlogs = (req, res) => {
  blogSchema
    .find({})
    .populate("rpid")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by RP id

const viewMyBlogsByRPid = (req, res) => {
  blogSchema
    .find({ rpid: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// add reviews
const addReview = (req, res) => {
  let review = req.body.review;
  let arr = [];
  blogSchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      arr = data.reviews;
      arr.push(review);
      blogSchema
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            reviews: arr,
          }
        )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
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
    });
};

//View   blogs by  id

const deleteBlogsById = (req, res) => {
  blogSchema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports = {
  addBlog,
  upload,
  viewAllBlogs,
  viewBlogsById,
  viewMyBlogsByRPid,
  addReview,
  deleteBlogsById,
};
