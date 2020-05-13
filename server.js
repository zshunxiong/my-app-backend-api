const express = require('express')

// use process.env variables to keep private variables, 環境變數 儲存帳密等
require('dotenv').config()

// Express Middleware 中間層 管理/轉換http資料
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// App
const app = express();

// App Middleware 啟用
const whitelist = ['http://localhost:3000','https://my-app-frontend.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// API 路徑宣告
const mainRouter = require('./routes/main');
const crudRouter = require('./routes/crud');

// API 相對使用哪個路徑
app.use('/', mainRouter);
app.use('/crud', crudRouter);

// App Server Connection
app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`)
})