const mongoose = require("mongoose")
const participanteSchema = new mongoose.Schema(
  {
    id: { type: Number },
    nome: { type: String },
    sobrenome: { type: String },
    bio: { type: String }
  },
  {
    versionKey: false,
  }
)

const participantes = mongoose.model("participantes", participanteSchema)

module.exports = participantes;