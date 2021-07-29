const {
  create,
  getTip,
  updateTip,
  getTipById,
  deleteTip,
  getTipBydate,
  getTipByTime,
} = require("./tip.service");

module.exports = {
  createTip: (req, res) => {
    const body = req.body;
    getTipByTime(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          getTip((err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              data: results,
              message: "Saved successfully",
            });
          });
        });
      } else {
        return res.json({
          success: 0,
          message: "Record already exists for same time.",
        });
      }
    });
  },

  getTipById: (req, res) => {
    const tip_id = req.params.tip_id;
    getTipById(tip_id, (err, results) => {
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

  getTip: (req, res) => {
    getTip((err, results) => {
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

  updateTip: (req, res) => {
    const body = req.body;
    getTipByTime(body, (err, results) => {
      if (!results) {
        updateTip(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          getTip((err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              data: results,
              message: "Updated successfully",
            });
          });
        });
      } else {
        if (parseInt(body.tip_id) === parseInt(results.TIP_ID)) {
          updateTip(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            getTip((err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              return res.json({
                success: 1,
                data: results,
                message: "Updated successfully",
              });
            });
          });
        } else {
          return res.json({
            success: 0,
            message: "Record already exists for same date and time.",
          });
        }
      }
    });
  },

  deleteTip: (req, res) => {
    const tip_id = req.params.tip_id;
    deleteTip(tip_id, (err, results) => {
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
      getTip((err, results) => {
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

  getTipBydate: (req, res) => {
    const body = req.body;
    getTipBydate(body, (err, results) => {
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
};
