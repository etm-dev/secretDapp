module.exports = {
  save: async function(words) {
    //TODO msg.length<300
    //单步添加单词
    app.sdb.lock("add-word")
    app.sdb.create('Word', {
      'words': words
    })
  }
}
