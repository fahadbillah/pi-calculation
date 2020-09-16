import BigNumber from "bignumber.js";
import fs from "fs";

// BigNumber.config({ EXPONENTIAL_AT: 1e9 });

let piValue = BigNumber(0);
function calculatePi(iteration) {
  const hrstart = process.hrtime();
  let i = BigNumber(1);
  let x = BigNumber(3).multipliedBy(BigNumber(10).exponentiatedBy(iteration));
  let pi = x;
  while (x > 0) {
    x = x.multipliedBy(i).dividedBy(i.plus(1).multipliedBy(4));
    pi = pi.plus(x.dividedBy(i.plus(2)));
    i = i.plus(2);
  }
  piValue = pi.dividedBy(10 ** 20).toString().split('e')[0];
  const hrend = process.hrtime(hrstart);
  const sunRadius = BigNumber(696340);
  const sunCircumference = BigNumber(2).multipliedBy(piValue).multipliedBy(sunRadius);
  fs.writeFileSync("public/pi.json", JSON.stringify({
    calculationTime: `${hrend[0]}s, ${hrend[1] / 1000000}ms`,
    iteration,
    pi: piValue,
  }));
  fs.writeFileSync("public/sun.json", JSON.stringify({
    circumference: sunCircumference
  }));
  console.log(`Iteration no: ${iteration}, Calculation Time: ${hrend[0]}s, ${hrend[1] / 1000000}ms`);
}


process.on("message", (iteration) => {
  calculatePi(iteration);
});