const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO SCHEDULE_TABLE (RESULT_TIME) VALUES(UNIX_TIMESTAMP(?))`,
      [data.result_time],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSchedule: (callBack) => {
    pool.query(
      `SELECT *,FROM_UNIXTIME(RESULT_TIME,'%h:%i %p') AS TIME FROM SCHEDULE_TABLE ORDER BY SCHEDULE_ID`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getScheduleById: (id, callBack) => {
    pool.query(
      `SELECT *,FROM_UNIXTIME(RESULT_TIME,'%h:%i %p') AS TIME,FROM_UNIXTIME(RESULT_TIME,'%H:%i') AS TIME2 FROM SCHEDULE_TABLE WHERE SCHEDULE_ID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getScheduleByTime: (data, callBack) => {
    pool.query(
      `SELECT * FROM SCHEDULE_TABLE WHERE RESULT_TIME=UNIX_TIMESTAMP(?)`,
      [data.result_time],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteSchedule: (schedule_id, callBack) => {
    pool.query(
      `DELETE FROM SCHEDULE_TABLE WHERE SCHEDULE_ID=?`,
      [schedule_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
