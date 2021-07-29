const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO TIPS_TABLE (TIP,TIP_DATE,STATUS,SCHEDULE_ID) VALUES(?,UNIX_TIMESTAMP(?),?,?)`,
      [data.tip, data.tip_date, data.status, data.schedule_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getTip: (callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.TIP_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM TIPS_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID ORDER BY r.TIP_ID DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getTipById: (id, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.TIP_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM TIPS_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE TIP_ID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteTip: (tip_id, callBack) => {
    pool.query(
      `DELETE FROM TIPS_TABLE WHERE TIP_ID=?`,
      [tip_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getTipBydate: (data, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.TIP_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM TIPS_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE r.TIP_DATE=UNIX_TIMESTAMP(?)`,
      [data.tip_date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getTipByTime: (data, callBack) => {
    pool.query(
      `SELECT * FROM TIPS_TABLE WHERE SCHEDULE_ID=? AND TIP_DATE=UNIX_TIMESTAMP(?)`,
      [data.schedule_id, data.tip_date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateTip: (data, callBack) => {
    pool.query(
      `UPDATE TIPS_TABLE SET TIP=?,STATUS=?,SCHEDULE_ID=? WHERE TIP_ID=?`,
      [data.tip, data.status, data.schedule_id, data.tip_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
