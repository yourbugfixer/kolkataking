const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO RESULT_TABLE (PATTI_NO,PATTI_VALUE,RESULT_DATE,SCHEDULE_ID) VALUES(?,?,UNIX_TIMESTAMP(?),?)`,
      [data.patti_no, data.patti_value, data.result_date, data.schedule_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getResult: (callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.RESULT_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM RESULT_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID ORDER BY DATE(FROM_UNIXTIME(r.RESULT_DATE,'%Y-%m-%d')) DESC,SCHEDULE_ID ASC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getResultById: (id, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.RESULT_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM RESULT_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE r.RESULT_ID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteResult: (result_id, callBack) => {
    pool.query(
      `DELETE FROM RESULT_TABLE WHERE RESULT_ID=?`,
      [result_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getResultBydate: (data, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.RESULT_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM RESULT_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE r.RESULT_DATE=UNIX_TIMESTAMP(?) ORDER BY SCHEDULE_ID ASC`,
      [data.result_date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getResultBydatetime: (data, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.RESULT_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM RESULT_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE r.RESULT_DATE=UNIX_TIMESTAMP(?) AND r.SCHEDULE_ID=(?)`,
      [data.result_date, data.schedule_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPastResult: (data, callBack) => {
    pool.query(
      `SELECT r.*,FROM_UNIXTIME(r.RESULT_DATE,'%d/%m/%Y') AS DATE,FROM_UNIXTIME(s.RESULT_TIME,'%h:%i %p') AS TIME FROM RESULT_TABLE r INNER JOIN SCHEDULE_TABLE s ON r.SCHEDULE_ID = s.SCHEDULE_ID WHERE MONTH(FROM_UNIXTIME(r.RESULT_DATE)) = ? AND YEAR(FROM_UNIXTIME(r.RESULT_DATE))=? ORDER BY FROM_UNIXTIME(r.RESULT_DATE,'%Y-%m-%d') ASC,SCHEDULE_ID ASC`,
      [data.result_month, data.result_year],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
