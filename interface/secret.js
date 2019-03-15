let ids = require("../lib/ids")
let cryptoUtils = require("../lib/cryptoUtils")
let etmjs = require('etm-js')
let constants = require("../constant/constants")
let INVALIDATE_USER = constant.INVALIDATE_USER
//获取信息，并不改变信息
app.route.get('/getAllWords', async function(req) {
  let words = await app.model.Words.findAll({})
  return {
    words
  }
})

//测试id库
app.route.get('/testID', async function(req) {
  let id = ids.generateID()
  return {
    id
  }
})

//测试加密库
app.route.get('/test', async function(req) {
  let encodeMsg = cryptoUtils.encodeString("haha", 'a67581a70ab05f2b7fee337fc2c86cac95bc9382db9fb8d71820eca22dba9c08')
  return {
    encodeMsg
  }
})

//获取用户信息
app.route.get("/user/:address", async req => {
  let address = req.params.address
  if (!etmjs.crypto.isAddress(address)) return INVALIDATE_USER
  let user = await app.model.User.findOne({
    condition: {
      address
    }
  })
  return {
    user
  }
})