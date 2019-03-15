let constants = require("../constant/constants")
let ids = require("../lib/ids")
let cryptoUtils = require("../lib/cryptoUtils")
let etmjs = require('etm-js')

let STRING_LENGTH_ERROR = constant.STRING_LENGTH_ERROR
let ENCODE_STRING_ERROR = constant.ENCODE_STRING_ERROR
let INVALIDATE_USER = constant.INVALIDATE_USER

let INVALIDATE_RECEIVER = constant.INVALIDATE_RECEIVER
let INVALIDATE_PUBLIC_KEY = constant.INVALIDATE_PUBLIC_KEY
let INVALIDATE_NICKNAME = constant.INVALIDATE_NICKNAME
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
      address,
      publicKey,
      image,
      nickname
    })

  }
  save: async function(words, receiveAddress) {
    /*let sender = this.trs.senderId
    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
    if (!etmjs.crypto.isAddress(receiveAddress)) return INVALIDATE_RECEIVER
    //将接收者地址转换成publicKey
    let publicKey = null
    //1.在用户表中查询是否有该用户，有该用户就读取publickey
    //2.在主网中获取是否有publickey （如果是没注册的账户  是没有publickey存在的）
    try {
      let res = await axios.get("http://etm.red:8097/api/accounts/getPublickey?address=" + receiveAddress, {
        timeout: 5000
      })
      if(data.success){
        publicKey=data.publicKey
      }
    } catch (error) {
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

    //单步添加单词
    app.sdb.create('Word', {
      'id': ids.generateID(),
      'msg': encodeMsg,
      'sender': sender,


    })
    */
  }

}