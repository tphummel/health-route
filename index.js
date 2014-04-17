function healthCheck(req, res){
  var health = {
    ts: new Date,
    pid: process.pid,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    status: "ok"
  };

  res.writeHead(200, {"Content-Type": "application/json"});

  return res.end(JSON.stringify(health));
}

module.exports = healthCheck;
