const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO ADMIN_TABLE (ADMIN_NAME,ADMIN_EMAIL,ADMIN_PASSWORD) VALUES(?,?,?)`,
      [data.admin_name, data.admin_email, data.admin_password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAdmin: (callBack) => {
    pool.query(`SELECT * FROM ADMIN_TABLE`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getAdminById: (data, callBack) => {
    pool.query(
      `SELECT * FROM ADMIN_TABLE WHERE ADMIN_EMAIL=? AND ADMIN_PASSWORD=?`,
      [data.admin_email, data.old_password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateAdmin: (data, callBack) => {
    pool.query(
      `UPDATE ADMIN_TABLE SET ADMIN_PASSWORD=? WHERE ADMIN_EMAIL=?`,
      [data.admin_password, data.admin_email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteAdmin: (admin_id, callBack) => {
    pool.query(
      `DELETE FROM ADMIN_TABLE WHERE ADMIN_ID=?`,
      [admin_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAdminByemail: (email, callBack) => {
    pool.query(
      `SELECT * FROM ADMIN_TABLE WHERE ADMIN_EMAIL=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
