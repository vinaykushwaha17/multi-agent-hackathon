const fs = require('fs');
module.exports = function log(traceItem) {
  const logLine = `[${traceItem.agent}] ${traceItem.data}\n`;
  fs.appendFileSync('trace.log', logLine);
};
