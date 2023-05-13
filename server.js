const express = require('express');
const server = express();

server.all("/", (req, res) => {
  res.send('<meta http-equiv="refresh" content="0; URL=https://whxyu.space"/>')
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server Is ready")
  });
}

module.exports = keepAlive;
