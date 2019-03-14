let ids = require("../lib/ids")

//获取信息，并不改变信息
app.route.get('/getAllWords', async function(req) {
  let words = await app.model.Words.findAll({})
  return {
    words
  }
})


app.route.get('/testID', async function(req) {
  return ids.generateID()
})
