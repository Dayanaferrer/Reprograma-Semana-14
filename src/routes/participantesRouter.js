const express = require("express")
const router = express.Router()
const controller = require("../controllers/participantesController")

router.get("/", controller.getAllParticipantes)
router.post("/", controller.registrarParticipantes)
router.get("/lista-nomes", controller.getParticipantesList)
router.get("/:id", controller.getById)

router.delete("/:id", controller.deleteParticipantes)
router.put("/:id", controller.updateParticipantes)

module.exports = router