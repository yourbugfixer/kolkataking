require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const adminRouter = require("./api/admin/admin.router");
const resultRouter = require("./api/result/result.router");
const scheduleRouter = require("./api/schedule/schedule.router");
const tipsRouter = require("./api/tips/tip.router");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/admin", adminRouter);
app.use("/api/result", resultRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/tips", tipsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port: ${port}`));
