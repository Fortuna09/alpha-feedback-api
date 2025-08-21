require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const allowedOrigins = [
  'http://localhost:4200',        
  process.env.FRONTEND_URL        
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());



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
 *         name:
 *           type: string
 *           description: Nome do usuário que enviou o feedback
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         rating:
 *           type: integer
 *           description: Nota de 1 a 5 dada pelo usuário
 *         message:
 *           type: string
 *           description: Comentário sobre a experiência
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do feedback
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: "65abcdef1234567890123456"
 *         name: "João Silva"
 *         email: "joao@email.com"
 *         rating: 5
 *         message: "Ótimo atendimento!"
 *         createdAt: "2025-02-20T12:34:56.789Z"
 *         updatedAt: "2025-02-20T12:34:56.789Z"
 */

/**
 * @swagger
 * info:
 *   title: Alpha Feedback API
 *   description: API para gerenciamento de feedbacks dos usuários
 *   version: 1.0.0
 */

/**
 * @swagger
 * servers:
 *   - url: http://localhost:5000
 *     description: Servidor de Desenvolvimento
 */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alpha Feedback API",
      version: "1.0.0",
      description: "API para gerenciamento de feedbacks dos usuários",
    },
    servers: [{ url: "http://localhost:5000", description: "Servidor de Desenvolvimento" }],
  },
  apis: ["./routes/*.js"], // Inclui todas as rotas na documentação
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
