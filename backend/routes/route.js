import { Router } from "express";
import { findBooks, getAllBooks, createBook, updateBook, deleteBook, getBookByID, getBooksByAutor, addBookOnStock } from "../controllers/bookController.js";

const routes = Router();
routes.get("/find", findBooks)
routes.get("/get/:id", getBookByID)
routes.get("/getByAutor/:autor", getBooksByAutor)
routes.get("/getAll", getAllBooks)
routes.patch("/addOnStock/:id", addBookOnStock)
routes.post("/create", createBook)
routes.put("/update/:id", updateBook)
routes.delete("/delete/:id", deleteBook)

export default routes;