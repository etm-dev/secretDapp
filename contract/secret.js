let constants = require("../constant/constants")
let ids = require("../lib/ids")
let cryptoUtils = require("../lib/cryptoUtils")
let etmjs = require('etm-js')
let axios = require("axios")

let STRING_LENGTH_ERROR = constants.STRING_LENGTH_ERROR
let ENCODE_STRING_ERROR = constants.ENCODE_STRING_ERROR
let INVALIDATE_USER = constants.INVALIDATE_USER
let NET_ERROR = constants.NET_ERROR

let INVALIDATE_RECEIVER = constants.INVALIDATE_RECEIVER
let INVALIDATE_PUBLIC_KEY = constants.INVALIDATE_PUBLIC_KEY
let INVALIDATE_NICKNAME = constants.INVALIDATE_NICKNAME
module.exports = {
  register: async function(publicKey, image, nickname) {
    let sender = this.trs.senderId
    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
    let temAddress = etmjs.crypto.getAddress(publicKey)
    if (!etmjs.crypto.isAddress(temAddress)) return INVALIDATE_USER
    if (sender != temAddress) {
      return INVALIDATE_USER
    }
    if (!nickname) {
      return INVALIDATE_NICKNAME
    }
    await app.model.User.create({
      address: sender,
      publicKey,
      image,
      nickname
    })

  },



  encodeString: async function(words, receiveAddress) {
    let sender = this.trs.senderId
    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
    if (!etmjs.crypto.isAddress(receiveAddress)) return INVALIDATE_RECEIVER
    //将接收者地址转换成publicKey
    let publicKey = null
    //1.在用户表中查询是否有该用户，有该用户就读取publickey
    let receiveUser = await app.model.User.findOne({
      condition: {
        address: receiveAddress
      }
    })
    if (receiveUser) {
      publicKey = receiveUser.publicKey
    }
    //2.在主网中获取是否有publickey （如果是没注册的账户  是没有publickey存在的）
    if (!receiveUser) {
      try {
        let res = await axios.get("http://etm.red:8097/api/accounts/getPublickey?address=" + receiveAddress, {
          timeout: 5000
        })
        if (res && res.data && res.data.success) {
          publicKey = res.data.publicKey
        }
      } catch (e) {
        return NET_ERROR
      }
    }
    if (!publicKey) {
      return INVALIDATE_PUBLIC_KEY
    }
    // msg.length<300
    if (!words || words.length > 300) {
      return STRING_LENGTH_ERROR
    }
    let encodeMsg = null
    try {
      encodeMsg = cryptoUtils.cryptoUtils.encodeString(words, publicKey)
    } catch (e) {
      return ENCODE_STRING_ERROR
    }
    if (!encodeMsg) {
      return ENCODE_STRING_ERROR
    }

    app.sdb.create('Word', {
      'id': ids.generateID(),
      'msg': encodeMsg,
      'sender': sender,
      'receiver': receiveAddress,
      'date': Date.now(),
    })

  }

}
