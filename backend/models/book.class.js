import mongoose from "../db/conn.js"

const {Schema} = mongoose;
const BookSchema = new Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    isbn: {type: String, required: true},
    ano_publicacao: {type: Number, 
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }, required: false},
    quantidade_estoque: {type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }, required: false},
}, {timestamps: true});

const Book = mongoose.model("Book", BookSchema)
export default Book;