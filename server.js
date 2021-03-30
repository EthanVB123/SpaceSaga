if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
//const bodyParser = require('body-parser')
//const methodOverride = require('method-override')

// Here are my routers
const indexRouter = require('./routes/index.js')
const setupRouter = require('./routes/setup.js')

app.set("view engine", "ejs")
app.set("views", `${__dirname}/views`)
app.set("layout", "layouts/layout")
app.use(expressLayouts)
//app.use(methodOverride("_method"))
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({limit: "10mb", extended: false}))

// Mongoose stuff goes here
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/setup', setupRouter)

app.listen(process.env.PORT || 3000)