let nanoid = require('nanoid')
class Id{
  generateID(){
    return nanoid(12)
  }
}
let id = new Id()
// for (var i = 0; i < 1000; i++) {
//   console.log(id.generateID());
// }
module.exports = id
