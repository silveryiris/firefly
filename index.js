#!/usr/bin/env node --harmony

require = require("esm")(module)
require("./src/cli.js").cli(process.argv)

