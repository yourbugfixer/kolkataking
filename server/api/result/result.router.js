const {
  createResult,
  getResult,
  getResultById,
  deleteResult,
  getPastResult,
  getResultBydate,
} = require("./result.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", getResult);
router.get("/:result_id", checkToken, getResultById);
router.post("/", checkToken, createResult);
router.post("/byMonth", getPastResult);
router.delete("/:result_id", checkToken, deleteResult);
router.post("/byDate", getResultBydate);

module.exports = router;
