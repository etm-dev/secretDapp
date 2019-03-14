module.exports = {
  name: 'words',
  fields: [
    {
      name: "id",
      type: "String",
      length: 20,
      not_null: 1,
      primary_key: true
    },
    {
      name: 'msg',
      type: 'String',
      length: 2048,
      not_null: true,
    },
    {
      name: 'sender',
      type: 'String',
      length: 50,
      not_null: true,
    },
    {
      name: 'receiver',
      type: 'String',
      length: 50,
      not_null: true,
    },
    {
      name: "date",
      type: "String",
      length: 50
    }
  ]
}
