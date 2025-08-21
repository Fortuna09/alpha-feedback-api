const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - rating
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *           example: "65abcdef1234567890123456"
 *         name:
 *           type: string
 *           description: Nome do usuário que enviou o feedback
 *           example: "João Silva"
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *           example: "joao@email.com"
 *         rating:
 *           type: integer
 *           description: Nota de 1 a 5 dada pelo usuário
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         message:
 *           type: string
 *           description: Comentário sobre a experiência
 *           example: "Ótimo atendimento!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do feedback
 *           example: "2025-02-20T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *           example: "2025-02-20T12:34:56.789Z"
 */

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, minlength: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
