module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'secret.save')
  //dice cloud author endorse motion pave enact spy balcony avoid call tray

  await app.sdb.load('Words', app.model.Words.fields(), ['id'])

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
