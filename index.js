var http = require("http"),
    url = require("url"),
    path = require("path"),
    port = process.env.PORT || 3000,
    health;

health = function(req, res) {
  var status = {
    ts: new Date,
    version: require(path.join(__dirname,"package.json")).version,
    status: "ok"
  };

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  return res.end(JSON.stringify(status));
};

module.exports = http.createServer(function(req, res) {
  var method  = req.method.toLowerCase(), 
      path    = (url.parse(req.url)).pathname;

  if (path === "/health" && method === "get") {
    return health(req, res);
  } else {
    res.writeHead(404, 'Not Found');
    return res.end("Not Found\n");
  }
}).listen(port);