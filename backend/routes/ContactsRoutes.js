import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js"
import { searchContacts, getContactsForDmList, addFriend, getFriends} from "../controllers/ContactsController.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDmList);
contactsRoutes.post("/add-friend", verifyToken, addFriend)
contactsRoutes.get("/get-friends", verifyToken, getFriends)



export default contactsRoutes;