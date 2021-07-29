const {
  createSchedule,
  getSchedule,
  getScheduleById,
  deleteSchedule,
} = require("./schedule.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createSchedule);
router.get("/", getSchedule);
router.get("/:schedule_id", checkToken, getScheduleById);
router.delete("/:schedule_id", checkToken, deleteSchedule);

module.exports = router;
