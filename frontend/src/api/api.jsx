import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/Biblioteca",
    headers: {
        "Content-Type":"Application/json"
    }
})

export const findBooks = (parametros) => api.get("/find" + parametros);
export const getBookByID = (id) => api.get("/get/" + id);
export const getBooksByAutor = (autor) => api.get("/getByAutor/" + autor);
export const getAllBooks = () => api.get("/getAll");
export const addBookOnStock = (id, payload) => api.patch("/addOnStock/" + id, payload)
export const createBook = (payload) => api.post("/create", payload);
export const updateBook = (id, payload) => api.put("/update/" + id, payload);
export const deleteBook = (id) => api.delete("/delete/" + id);

export default api;