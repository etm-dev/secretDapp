let ids = require("../lib/ids")
let cryptoUtils = require("../lib/cryptoUtils")
let etmjs = require('etm-js')
let constants = require("../constant/constants")
let INVALIDATE_USER = constants.INVALIDATE_USER
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

//获取加密的信息
app.route.get("/msg/:address", async req => {
  let {
    page,
    count
  } = req.query
  page = page || 1
  count = count || 10
  let address = req.params.address
  if (!etmjs.crypto.isAddress(address)) return INVALIDATE_USER
  let encodeMsgs = await app.model.Words.findAll({
    condition: {
      receiver:address
    },
    limit: count,
    offset: count * (page - 1)
  })
  let totalCount = await app.model.Words.count({})
  return {
    encodeMsgs,
    totalCount
  }
})
