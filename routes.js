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

const ctutorials = require("./councilar/Tutorials/tutorialController");
const childs = require("./child/childController");
const parentRpChatController = require("./Chats/parentRpChatController");

const { uploadSingleImg } = require("./rp/middleware");

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
router.post("/rpforgotPwd", rpController.forgotPwd);

// councilar routs
router.post(
  "/registerCouncilar",
  councilarController.multipleUpload,
  councilarController.registerCouncilar
);
router.post(
  "/loginCouncilar",
  checkEmailAndPassword,
  councilarController.loginCouncilar
);

router.get("/viewAllCouncilars", councilarController.viewAllCouncilars);
router.get("/viewCouncilarById/:id", councilarController.viewCouncilarById);
router.post("/editCouncilarById/:id", councilarController.editCouncilarById);
router.post("/updatePassword", councilarController.updatePassword);
router.delete(
  "/deleteCouncilarById/:id",
  councilarController.deleteCouncilarById
);

router.post("/counsellorcollection", councilarController.counsellorCollection);
router.post("/counselloraddrating/:id", councilarController.addRating); //skr
// router.post("/viewCouncillorReqs", councilarController.viewCouncillorReqs);//skr
// router.post("/approveCouncillorById/:id", councilarController.approveCouncillorById);//skr

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
router.get("/viewTaskQnById/:id", taskController.viewTaskQnById);
router.get("/viewTaskQnByRPId/:id", taskController.viewTaskQnByRPId);

router.get("/viewAllTasks", taskController.viewAllTasks);
router.post("/addAnswers/:id", taskController.addAnswers);
router.get("/viewAddAnswersByParentId/:id", taskController.getAllAnswers);
//blogs
router.post("/addBlog", uploadSingleImg, blogs.addBlog);
router.get("/viewAllBlogs", blogs.viewAllBlogs);
router.get("/viewBlogsById/:id", blogs.viewBlogsById);
router.get("/viewMyBlogsByRpid/:id", blogs.viewMyBlogsByRPid);
router.post("/addReview/:id", blogs.addReview);
router.post("/deleteBlogsById/:id", blogs.deleteBlogsById);

//consellor tutorials
router.post(
  "/counselloraddTutorial",
  rpController.multipleUpload,
  ctutorials.addTutorial
);
router.get("/viewAllcounsellorTutorials", ctutorials.getAllTutorials);
router.get(
  "/viewTutorialByCounsellorId/:id",
  ctutorials.getTutorialsByCouncellorId
);
router.get("/editcounsellorVideoTutorial/:id", ctutorials.editVideoTutorial);
router.patch(
  "/deletecounsellorVideoTutorial/:id",
  ctutorials.deleteVideoTutorial
);
router.get("/getcounsellorTutorialById/:id", ctutorials.getTutorialById);

router.get("/viewAllChilds", childs.viewAllChilds);

router.post(
  "/cacceptRpRegistration/:id",
  councilarController.acceptRegistrationCounsellor
);
router.post(
  "/crejectRpRegistration/:id",
  councilarController.rejectRegistrationCounsellor
);

//chat -soumya
router.post("/chattingParentRp", parentRpChatController.chattingParentRp);
router.post(
  "/viewChatRecipientsforParentId/:id",
  parentRpChatController.viewChatRecipientsforParentId
);
router.post(
  "/viewChatRecipientsforRPId/:id",
  parentRpChatController.viewChatRecipientsforParentId
);
router.post(
  "/viewChatBerweenParentAndRp",
  parentRpChatController.viewChatBerweenParentAndRp
);
router.post(
  "/get-chat-between-parent-and-rp",
  parentRpChatController.getChatBetweenParentAndRp
);

router.get("/getAllChats", parentRpChatController.getAllChats);
router.post("/rpedit/:id", rpController.editrpById);

module.exports = router;
