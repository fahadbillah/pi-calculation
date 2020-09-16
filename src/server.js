import express from "express";
import compression from "compression";

const app = express();
const port = 3000;

app.use(compression());

app.use(express.static("public", { extensions: ["json"] })); 

const { fork } = require("child_process");
const forked = fork("./src/calculatepi.js");

let iteration = process.env.ITR || 10000;

(function calculatePi() {
  forked.send(iteration);
  iteration++;
  setTimeout(calculatePi, 100);
})();

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  console.error(err.stack);
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Open http://localhost:${port} in broswer to check latest values. Calculating PI...`);
});
