// db.js
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './veritabani.sqlite'  // dosya olarak saklanacak
  },
  useNullAsDefault: true
});

module.exports = knex;
