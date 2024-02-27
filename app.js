const express = require("express")
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Urls = require("./models/urls")
const random = require('./shortRandom')

const findOrCreate = require('mongoose-findorcreate')
const shortRandom = require("./shortRandom")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true ,useUnifiedTopology: true})

db.once('open',()=>{
    console.log('connected!')
})

app.engine('hbs',exhbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/', (req,res) => {
    const originalUrl = req.body.url

    Urls.findOne({url : originalUrl} , function (err , result) {
        if(err){console.log(error)

        return}

        if(result){
            res.render('finish',{ data:result.shortRandom })
        }else{
            const short = random(5)
            Urls.create({
            url : originalUrl,
            shortRandom : short, 
        })
        .then(() => res.render('finish', { data:short }))

    }})
})

app.get('/:short',(req,res)=>{
    const {short} = req.params
    console.log(short)
    return Urls.findOne({ shortRandom: short})
    .lean()
    .then((url) => res.render('finish', { originalUrl:url }))
})


app.listen(port,()=>{
    console.log('gogo')
})