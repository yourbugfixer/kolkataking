const {
  createTip,
  getTip,
  getTipById,
  deleteTip,
  getTipBydate,
  updateTip,
} = require("./tip.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", getTip);
router.get("/:tip_id", checkToken, getTipById);
router.patch("/", checkToken, updateTip);
router.post("/", checkToken, createTip);
router.post("/byDate", getTipBydate);
router.delete("/:tip_id", checkToken, deleteTip);

module.exports = router;
