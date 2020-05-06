const express = require('express');

// db Connection w/ Heroku
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: connectionString,
//     ssl: true,
//   }
// });

// db Connection w/ localhost 資料庫連線設定
const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

module.exports = db;