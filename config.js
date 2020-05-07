const express = require('express');

// db Connection w/ Heroku
const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

// db Connection w/ localhost 資料庫連線設定
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     host: process.env.local_HOST,
//     user: process.env.local_USER,
//     password: process.env.local_PASSWORD,
//     database: process.env.local_DATABASE
//   }
// });

module.exports = pool;