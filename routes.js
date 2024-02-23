const express = require("express");
const router = express.Router();

const parentController = require("./Parent/parentController");

//Parent routes
router.post('/registerParent',parentController.registerParent)
router.post('/loginParent',parentController.loginParent)
router.post('/viewParentById/:id',parentController.viewParentById)
router.post('/viewParents',parentController.viewParents)
router.post('/editParentById/:id',parentController.editParentById)
router.post('/deleteParentById/:id',parentController.deleteParentById)
router.post('/forgotPwdParent',parentController.forgotPwd)

module.exports = router;
