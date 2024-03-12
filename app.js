const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const db = mongoose.connection
const exhbs = require("express-handlebars")
const bodyParser = require("body-parser")
const Urls = require("./models/urls")
const random = require("./shortRandom")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

db.once("open", () => {
  console.log("connected!")
})

app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  const originalUrl = req.body.url
  const short = random(5)

  Urls.findOne({ url: originalUrl })
    .then((result) => {
      if (!result) {
        return Urls.create({
          url: originalUrl,
          shortRandom: short,
        })
      } else {
        return result
      }
    })
    .then((result) => res.render("finish", { data: result.shortRandom }))
})

app.get("/:short", (req, res, next) => {
  const { short } = req.params
  return Urls.findOne({ shortRandom: short })
    .lean()
    .then((url) => res.render("finish", { originalUrl: url }))
    .catch(next)
})

app.listen(port, () => {
  console.log("gogo")
})
