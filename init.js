let config = require("./config")

module.exports = async function () {

  app.registerContract(1000, 'secret.save')
  //dice cloud author endorse motion pave enact spy balcony avoid call tray
  app.registerContract(1001, 'secret.register')
  app.setDefaultFee("0", config.FEE_NAME)

  await app.sdb.load('Words', app.model.Words.fields(), ['id'])

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
