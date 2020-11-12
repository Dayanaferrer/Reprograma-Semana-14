const participantes = require("../models/mulheresSchema.js")

const getAllParticipantes = (req, res) => {
  participantes.find((err, participantes) => {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(200).send(participantes)
    }
  })
}

const getById = (req, res) => {
  const id = req.params.id;
  participantes.find(
    { id },
    { nome: 1, sobrenome: 1, bio: 1, _id: 0 },
    (err, participantes) => {
      if (err) {
        res.status(500).send({ message: err.message })
      } else if (participantes.length > 0) {
        res.status(200).send(participantes);
      } else {
        res.status(404).send({ message: "Participantes not found." })
      }
    }
  )
}

const getParticipantesList = (req, res) => {
  const participantesList = participantes.map((namesList) => namesList.nome)
  res.status(200).send(participantesList);
}
 
const registrarParticipantes = (req, res) => {
  participantes.countDocuments((err, count) => {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      let participante = new participantes(req.body)
      participante.id = count + 1
      participante.save((err) => {
        if (err) {
          res.status(500).send({ message: err.message })
        } else {
          res.status(201).send({
            status: true,
            message: "Participantes Incluida com Sucesso!",
          })
        }
      })
    }
  })
}

const deleteParticipantes = (req, res) => {
  const id = req.params.id;
  participantes.deleteMany({ id }, (err) => {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(200).send({ message: "participantes deleted successfully!" })
    }
  })
}

const updateParticipantes = (req, res) => {
  const id = req.params.id
  participantes.updateMany({ id }, { $set: req.body }, { upsert: true }, (err) => {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(200).send({ message: "participantes updated successfully!" })
    }
  })
}

module.exports = {
  getAllParticipantes,
  getById,
  getParticipantesList,
  registrarParticipantes,
  deleteParticipantes,
  updateParticipantes
}
