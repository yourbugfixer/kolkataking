const {
  create,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByemail,
} = require("./admin.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.admin_password = hashSync(body.admin_password, salt);

    getAdminByemail(body.admin_email, (err, results) => {
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
          getAdmin((err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.status(200).json({
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

  getAdminById: (req, res) => {
    const admin_id = req.params.admin_id;
    getAdminById(admin_id, (err, results) => {
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

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getAdmin: (req, res) => {
    getAdmin((err, results) => {
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

  updateAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.admin_password = hashSync(body.admin_password, salt);
    getAdminById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results) {
        updateAdmin(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.status(200).json({
            success: 1,
            message: "updated successfully",
          });
        });
      } else {
        return res.json({
          success: 0,
          message: "Old Password not matched with the record",
        });
      }
    });
  },

  deleteAdmin: (req, res) => {
    const admin_id = req.params.admin_id;
    deleteAdmin(admin_id, (err, results) => {
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
      getAdmin((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
          message: "Admin removed successfully",
        });
      });
    });
  },

  getAdminByemail: (req, res) => {
    const body = req.body;
    getAdminByemail(body.admin_email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.admin_password, results.ADMIN_PASSWORD);
      if (result) {
        results.admin_password = undefined;
        const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          success: 1,
          message: "Login successfull",
          admin_email: results.ADMIN_EMAIL,
          admin_name: results.ADMIN_NAME,
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },
};
