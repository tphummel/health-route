if (process.env.NODE_ENV == null) process.env.NODE_ENV = "development";

var test = require("tape");

test("/health", function(t){
  var server  = require("./"),
      getJson = require("get-json-hq");

  getJson("http://localhost:3000/health", function(err, res){
    t.notOk(err, "no err from GET /health");
    t.ok(res, "truthy res object");

    server.close();
    t.end();
  });
});