var test = require('tape')
var http = require('http')
var lib = require('./')

test('health-route', function(t){
  var server = http.createServer(lib).listen(1337)

  http.get('http://localhost:1337/', function(res){
    var payload = ''

    t.equal(res.statusCode, 200)

    res.on('data', function(d){
      payload += d

    }).on('end', function(){
      var health = JSON.parse(payload.toString())

      t.ok(health.ts, 'has field "ts"')
      t.ok(health.pid, 'has field "pid"')
      t.ok(health.uptime >= 0, 'has field "uptime"')
      t.ok(health.memory, 'has field "memory"')
      t.equal(health.status, 'ok')

      server.close()
      t.end()
    })

  }).on('error', function(e){
    server.close()
    t.fail(e)
  })
})
