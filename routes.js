const express = require("express");
const router = express.Router();

const multer = require("multer");
const parentController = require("./Parent/parentController");
const rpController = require("./rp/rpController");
const councilarController = require("./councilar/councilarController");
const Tutorials = require("./rp/Tutorials/tutorialController");

// common middlewares
const { upload, isEmailUnique } = require("./middlewares");
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

// resource person routes
router.post(
  "/registerRp",
  checkEmailAndPassword,
  isEmailUnique,
  rpController.registerRp
);
router.post("/loginRp", checkEmailAndPassword, rpController.loginRp);

router.get("/view-all-rp", rpController.viewAllRps);
router.get("/view-rp-by-id/:id", rpController.viewRpById);

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
router.delete("/deleteCouncilarById/:id", councilarController.deleteCouncilarById);


//tutorials

router.get("/addTutorial", Tutorials.addTutorial);
router.get("/editVideoTutorial/:id", Tutorials.editVideoTutorial);
router.patch("/deleteVideoTutorial/:id", Tutorials.deleteVideoTutorial);
module.exports = router;
