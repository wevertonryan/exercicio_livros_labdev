import axios from "axios";

const api = axios.create({
    baseURL: "https://fictional-zebra-x5979qrrw4vxhwww-5000.app.github.dev/Biblioteca",
    headers: {
        "Content-Type":"Application/json"
    }
})

export const findBooks = (parametros) => api.get("/find" + parametros);
export const getBookByID = (id) => api.get("/get/" + id);
export const getBooksByAutor = (autor, page = 1) => api.get(`/getByAutor/${autor}?page=${page}`);
export const getAllBooks = (page = 1) => api.get(`/getAll?page=${page}`);
export const addBookOnStock = (id, quant = 1) => api.patch(`/addOnStock/${id}?quant=${quant}`);
export const createBook = (payload) => api.post("/create", payload);
export const updateBook = (id, payload) => api.put("/update/" + id, payload);
export const deleteBook = (id) => api.delete("/delete/" + id);

export default api;