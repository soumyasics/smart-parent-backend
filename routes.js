const express = require("express");
const router = express.Router();

const multer = require("multer");
const parentController = require("./Parent/parentController");
const rpController = require("./rp/rpController");
const councilarController = require("./councilar/councilarController");
const Tutorials = require("./rp/Tutorials/tutorialController");
const subscribeController = require("./subscribe/subscribeController");
const taskController = require("./rp/Tasks/taskController");
const blogs = require("./rp/Blogs/blogController");

// common middlewares
const { isEmailUnique } = require("./middlewares");
// resource person middlewares
const { checkEmailAndPassword } = require("./rp/middleware");

//Parent routes
router.post("/registerParent", parentController.registerParent);
router.post("/loginParent", parentController.loginParent);
router.post("/viewParentById/:id", parentController.viewParentById);
router.post("/viewParents", parentController.viewParents);
router.post("/editParentById/:id", parentController.editParentById);
router.post("/deleteParentById/:id", parentController.deleteParentById);
router.post("/forgotPwdParent", parentController.forgotPwd);
router.post("/parentcollection", parentController.parentCollection);
// resource person routes
router.post(
  "/registerRp",
  rpController.multipleUpload,
  rpController.registerRp
);

router.post("/loginRp", rpController.loginRp);

router.get("/view-all-rp", rpController.viewAllRps);
router.get("/view-rp-by-id/:id", rpController.viewRpById);

router.post("/acceptRpRegistration/:id", rpController.acceptRegistration);
router.post("/rejectRpRegistration/:id", rpController.rejectRegistration);
//soumya for rating of rp
//now
router.post("/addRating/:id", rpController.addRating);

router.post("/rpcollection", rpController.RpCollection);

// councilar routs
router.post(
  "/registerCouncilar",
  checkEmailAndPassword,
  isEmailUnique,
  councilarController.registerCouncilar
);
router.post(
  "/loginCouncilar",
  checkEmailAndPassword,
  councilarController.loginCouncilar
);

router.get("/viewAllCouncilars", councilarController.viewAllCouncilars);
router.get("/viewCouncilarById/:id", councilarController.viewCouncilarById);
router.patch("/editCouncilarById/:id", councilarController.editCouncilarById);
router.patch("/updatePassword/:id", councilarController.updatePassword);
router.delete(
  "/deleteCouncilarById/:id",
  councilarController.deleteCouncilarById
);

router.post("/counsellorcollection", councilarController.counsellorCollection);


//tutorials
router.post("/addTutorial", rpController.multipleUpload, Tutorials.addTutorial);
router.get("/viewAllTutorials", Tutorials.getAllTutorials);
router.get("/viewTutorialByRpId/:id", Tutorials.getTutorialsByRpId);
router.get("/editVideoTutorial/:id", Tutorials.editVideoTutorial);
router.patch("/deleteVideoTutorial/:id", Tutorials.deleteVideoTutorial);
router.get("/getTutorialById/:id", Tutorials.getTutorialById);

// subscription
router.post("/new-subscription", subscribeController.newSubscribe);
router.get("/get-all-subscription", subscribeController.getAllSubscription);
router.get(
  "/get-all-subscriptions-by-parent-id/:id",
  subscribeController.getAllSubscriptionByParentId
);
router.get(
  "/get-all-subscriptions-by-rp-id/:id",
  subscribeController.getAllSubscriptionByRpId
);
router.get(
  "/get-subscription-by-id/:id",
  subscribeController.getSubscriptionById
);

// tasks
router.post("/addQuestions", taskController.addQuestions);
router.post("/deleteTaskById/:id", taskController.deleteTaskById);
router.post("/viewTaskQnById/:id", taskController.viewTaskQnById);
router.post("/viewTaskQnByRPId/:id", taskController.viewTaskQnByRPId);
router.get("/viewAllTasks", taskController.viewAllTasks);
router.post("/addAnswers/:id", taskController.addAnswers);

//blogs
router.post("/addBlog/:id", blogs.upload.array("img"), blogs.addBlog);
router.post("/viewAllBlogs", blogs.viewAllBlogs);
router.post("/viewBlogsById/:id", blogs.viewBlogsById);
router.post("/viewMyBlogsByCid/:id", blogs.viewMyBlogsByRPid);
router.post("/addReview/:id", blogs.addReview);
router.post("/deleteBlogsById/:id", blogs.deleteBlogsById);

module.exports = router;
