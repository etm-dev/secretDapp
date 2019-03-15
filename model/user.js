module.exports = {
  name: "users",
  fields: [{
    name: 'address',
    type: 'String',
    not_null: 1,
    length: 100
  }, {
    name: "publicKey",
    type: "String",
    length: 100
  }, {
    name: "image",
    type: "String",
    length: 256
  }, {
    name: "nickname",
    type: "String",
    length: 50
  }]
}
