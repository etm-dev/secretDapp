let ids = require("../lib/ids")
let cryptoUtils = require("../lib/cryptoUtils")
let etmjs = require('etm-js')
let constants = require("../constant/constants")
let INVALIDATE_USER = constants.INVALIDATE_USER
let DECODE_STRING_ERROR = constants.DECODE_STRING_ERROR

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
      receiver: address
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

//http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/decode
//demo: http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/decode?encodeMsg=0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22&secret=foot%20profit%20decorate%20orient%20quit%20goose%20upon%20curve%20coast%20warm%20income%20manual
//所有的解密操作都可以在本地实现，本示例仅仅为了更好的给大家演示
//TODO  如果开发者觉得这样不安全，完全可以把加密解密放到本地操作，此案例只是更好的给大家演示
app.route.get("/decode", async req => {
  let {
    encodeMsg,
    secret
  } = req.query
  //由于secret是带空格的，所有需要在发送请求的时候进行encodeURI
  //此处就是decodeURI
  encodeMsg = decodeURI(encodeMsg)
  secret=decodeURI(secret)
  //既然已经有了secret 那么说明不需要再验证地址之类的合法性，secret代表最大权限
  if (!secret) {
    return DECODE_STRING_ERROR
  }
  try {
    dmsg = cryptoUtils.decodeString(encodeMsg, secret)
  } catch (e) {
    return DECODE_STRING_ERROR
  }
  return {
    dmsg
  }
})
