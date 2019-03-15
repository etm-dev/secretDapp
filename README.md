# secretDapp(秘密Dapp)

基于密码学的加密信息保存dapp

### entanmo加密方式

entanmo使用的是`Ed25519`算法进行验证交易合法性的。   
Ed25519是一个数字签名算法，签名和验证的性能都极高， 一个4核2.4GHz 的 Westmere cpu，每秒可以验证 71000 个签名，安全性极高，等价于RSA约3000-bit。签名过程不依赖随机数生成器，不依赖hash函数的防碰撞性，没有时间通道攻击的问题，并且签名很小，只有64字节，公钥也很小，只有32字节。

### 但是
entanmo(以及其他所有区块链项目验证信息的流程都是基于以下流程)

**验证信息的流程：**   
信息-->私钥加密-->把信息丢到区块链上-->公钥验证此信息的合法性

大家如果了解对称加密，其实很容易理解，其实公钥和私钥的位置是可以互换的，就是公钥也可以加密信息，私钥也可以解密信息。

**那么重点来了**
我们可以用特定的公钥加密信息，然后储存到区块链上，只让特定的人看到此信息。也是可以行的

**秘密Dapp流程：**
信息-->公钥加密-->把加密信息丢到区块链上-->拥有私钥的人才能解密该信息



### config
secret : dice cloud author endorse motion pave enact spy balcony avoid call tray   
address : AnNuuLPud31Mvkw57Z2aq9TJ15xQbnxAw   
publicKey : a67581a70ab05f2b7fee337fc2c86cac95bc9382db9fb8d71820eca22dba9c08    
Dapp address : 27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6    
