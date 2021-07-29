const {
  create,
  getSchedule,
  getScheduleById,
  getScheduleByTime,
  deleteSchedule,
} = require("./schedule.service");

module.exports = {
  createSchedule: (req, res) => {
    const body = req.body;

    getScheduleByTime(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length === 0) {
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          getSchedule((err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              data: results,
              message: "Saved Successfully",
            });
          });
        });
      } else {
        return res.json({
          success: 0,
          data: results,
          message: "Record already exists",
        });
      }
    });
  },

  getScheduleById: (req, res) => {
    const schedule_id = req.params.schedule_id;
    getScheduleById(schedule_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getSchedule: (req, res) => {
    getSchedule((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  deleteSchedule: (req, res) => {
    const schedule_id = req.params.schedule_id;
    deleteSchedule(schedule_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      getSchedule((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
          message: "Removed successfully",
        });
      });
    });
  },
};
