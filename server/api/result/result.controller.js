const {
  create,
  getResult,
  getResultById,
  deleteResult,
  getResultBydate,
  getResultBydatetime,
  getPastResult,
} = require("./result.service");

module.exports = {
  createResult: (req, res) => {
    const body = req.body;
    getResultBydatetime(body, (err, results) => {
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
          getResult((err, results) => {
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
          data: results,
          message: "Record already exists for same date and time",
        });
      }
    });
  },

  getResultById: (req, res) => {
    const result_id = req.params.result_id;
    getResultById(result_id, (err, results) => {
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

  getResult: (req, res) => {
    getResult((err, results) => {
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

  deleteResult: (req, res) => {
    const result_id = req.params.result_id;
    deleteResult(result_id, (err, results) => {
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
      getResult((err, results) => {
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

  getResultBydate: (req, res) => {
    const body = req.body;
    getResultBydate(body, (err, results) => {
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

  getPastResult: (req, res) => {
    const body = req.body;
    getPastResult(body, (err, results) => {
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
};
