"use strict";
var db = require("../utils/db-connection")

function getBusinessById(id, callback){
  let GET_BUSINESS = "SELECT ID as id, NAME as name, STATUS as status FROM Business WHERE ID = ?"
  db.query({businessId:id}, GET_BUSINESS, [id], function(err, results){
    if(err) {
      callback(err)
    } else {
      callback(null, results[0])
    }
  });
};

module.exports = {
  getBusinessById: getBusinessById
};
