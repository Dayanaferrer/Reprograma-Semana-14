const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/dbparticipantes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let db = mongoose.connection;
db.on("error", console.log.bind(console, "Connection Error#"))
db.once("open", () => {
  console.log("Conectado com sucesso!");
})

const index = require("./routes/index");
const participantes = require("./routes/participantesRouter")

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  )
  next()
})

app.use("/", index)
app.use("/participantes", participantes)

module.exports = app