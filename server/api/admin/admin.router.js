const {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByemail,
} = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getAdmin);
router.post("/login", getAdminByemail);
router.post("/", checkToken, createAdmin);
router.patch("/", checkToken, updateAdmin);
router.delete("/:admin_id", checkToken, deleteAdmin);

module.exports = router;
