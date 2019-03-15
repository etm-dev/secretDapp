let nacl = require('tweetnacl')
let nacl_util = require('tweetnacl-util')
let nacl_sealedbox = require('tweetnacl-sealedbox-js');
let ed2curve = require('ed2curve')
let sha256 = require("fast-sha256");

class CryptoUtils {

    sha256Bytes(data) {
        return Buffer.from(sha256.hash(data))
    }

    HexStringToUint8Array(hexString) {
        return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    }

    uint8ArrayToHex(u8Array) {
        return new Buffer(u8Array).toString("hex")
    }


    //加密
    encodeString(msg, receivePublicKey) {
        let dmsg = nacl_util.decodeUTF8(msg)
        let u8boxPk = ed2curve.convertPublicKey(this.HexStringToUint8Array(receivePublicKey))
        let uint8Array = nacl_sealedbox.seal(dmsg, u8boxPk)
        return this.uint8ArrayToHex(uint8Array)
    }
    //解密
    decodeString(encodeMsg, secret) {
        let hash = this.sha256Bytes(new Buffer(secret))
        let signKeyPair = nacl.sign.keyPair.fromSeed(hash);
        let dhKeys = ed2curve.convertKeyPair(signKeyPair);
        let result = nacl_sealedbox.open(this.HexStringToUint8Array(encodeMsg), dhKeys.publicKey, dhKeys.secretKey)
        return nacl_util.encodeUTF8(result)
    }

}

let cryptoUtils = new CryptoUtils()
module.exports = cryptoUtils
// let originMsg = '在区块链所面临的多问题中,区块链之间互通性极大程度的限制了区块链的应用空间不论对于公有链还是私有链来看,跨链技术就是实现价值传递的关键，将区块链从分散的孤岛中拯救出来,是区块链向外拓展和连接的桥梁。现有的跨链技术主要以侧链为主,但其实际上实现的仅仅只是价值锁定,而不是价值传递。为此,“En-Tan-Mo”经过对现有跨链技术的研究,提出了一种平行链交互协议,很好的实现了链与链之间的价值传递,从而构建了一个可以包含千万级应用的区块链生态系统。 为了解决区块链快速和区块链即服务(BaaS)的问题,“En-Tan-Mo”采用了一条中心链加多条衍生链的设计,中心链负责网络安全及价值交换。衍生链是一种特殊的区块链,每一个衍生链对应一个DAPP'
//
// let encodeMsg = encodeString(originMsg,'a67581a70ab05f2b7fee337fc2c86cac95bc9382db9fb8d71820eca22dba9c08')
// console.log(originMsg.length);
// console.log(encodeMsg.length);
//
// let decodeMsg = decodeString(encodeMsg,'dice cloud author endorse motion pave enact spy balcony avoid call tray')
// console.log(decodeMsg);
