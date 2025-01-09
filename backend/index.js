import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactsRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: (origin, callback) => {
        // Permite qualquer origem, incluindo null para requests locais
        if (!origin || origin === "null") {
            return callback(null, true);
        }
        callback(null, origin);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Permite envio de cookies e headers protegidos
}));

app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);


const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

setupSocket(server);

mongoose.connect(databaseURL).then(() =>
    console.log("DB conectado com sucesso.")
).catch((err) => { console.log(err.message) })