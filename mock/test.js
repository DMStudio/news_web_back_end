function mockRunner (app) {
  app.use('*', function (req, res, next) {
    console.dir(req.url)
    console.log(' =  =  =  =  =  =  =  =  =  =  =  =  = ')
    next()
  })

  // mock根据/api/test进行正则匹配，匹配成功则进行拦截，并发送响应数据
  app.use('/api/test', function (req, res, next) {
    res.send({'msg': 'success'})
  })
}

module.exports = mockRunner
