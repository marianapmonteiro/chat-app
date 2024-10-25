import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js"
import { searchContacts, getContactsForDmList } from "../controllers/ContactsController.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDmList)



export default contactsRoutes;