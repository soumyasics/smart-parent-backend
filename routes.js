const express = require("express");
const router = express.Router();

const multer = require("multer");
const parentController = require("./Parent/parentController");
const rpController = require("./rp/rpController");
const councilarController = require("./councilar/councilarController");
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
module.exports = router;
