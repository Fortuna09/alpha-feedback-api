const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Cria um novo feedback
 *     description: Salva um feedback no banco de dados
 *     tags:
 *       - Feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               rating:
 *                 type: integer
 *                 example: 5
 *               message:
 *                 type: string
 *                 example: "Ótimo atendimento!"
 *     responses:
 *       201:
 *         description: Feedback salvo com sucesso
 *       400:
 *         description: Erro ao salvar feedback
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    const feedback = new Feedback({ name, email, rating, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback salvo com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao salvar feedback." });
  }
});

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Lista todos os feedbacks
 *     description: Retorna um array com todos os feedbacks armazenados
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: Lista de feedbacks retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65abcdef1234567890123456"
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     example: "joao@email.com"
 *                   rating:
 *                     type: integer
 *                     example: 5
 *                   message:
 *                     type: string
 *                     example: "Ótimo atendimento!"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar feedbacks." });
  }
});

module.exports = router;
