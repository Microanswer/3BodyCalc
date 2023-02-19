#!/usr/bin/env node

const ThreeBodyCalc = require("./src/3BodyCalc");
let tbc = new ThreeBodyCalc();

tbc.startCalc().then(() => {
    // success. do nothing.
}).catch(err => {
    console.error("calc err", err);
});