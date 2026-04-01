import mongoose from "mongoose";

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Biblioteca");

    console.log("Conectou MongoDB");
}
await main().catch((err)=>{console.log("Erro na conexão com o Banco: " + err)})
export default mongoose;