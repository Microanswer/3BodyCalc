#!/usr/bin/env node

const ThreeBodyCalc = require("./src/3BodyCalc");
let calcer = new ThreeBodyCalc();

calcer.startCalc().then(() => {
    // success. do nothing.
}).catch(err => {
    console.error("calc err", err);
});