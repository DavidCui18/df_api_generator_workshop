var logger = require("./logger");
var POOLSIZE = 10;
var routes = require("d3-database").routes;
var connection = require("d3-database").connection(routes[process.env.NODE_ENV || "development"], POOLSIZE, logger);

module.exports = {
  nodegroups: connection.nodegroups,
  query: connection.query,
  ping: connection.ping
};
