import { useState } from "react";
import { addBookOnStock } from "../api/api";
import { toast } from 'react-toastify';

export default function PopUpAddBookOnStock({id, titulo, setIsPopUpAddOnStockVisible, refetch}){
    const [quantidade, setQuantidade] = useState(0)

    const addingOnStock = ()=>{return new Promise((resolve, reject) =>{
        const payload = JSON.stringify({quant: quantidade})
        addBookOnStock(id, payload)
        .then(result => {
            setIsPopUpAddOnStockVisible(false);
            refetch()
            resolve(result.data.result);
            return;
        })
        .catch(error => reject(error.message))
    })}
    const handleAddOnStock = () => {
        console.log("2")
        if(quantidade < 1) {
            toast.warning("Valor precisa ser maior do que zero!");
            return;
        } 

        toast.promise(addingOnStock(),{
            pending: 'Adicionando ao Estoque',
            success: 'Livros adicionados ao estoque com Sucesso!',
            error: 'Falha ao adicionar ao estoque!'
        })
    }
    return(
        <div className="fixed top-0 right-0 flex justify-center items-center w-full h-full bg-[#00000080]">
            <div className="relative p-16 bg-orange-200 flex flex-col rounded gap-6">
                <p className="absolute top-5 left-5 hover:cursor-pointer" onClick={()=> setIsPopUpAddOnStockVisible(false)}>Voltar</p>
                <div className="flex flex-col gap-1">
                <h1>Adicionar Estoque</h1>
                <p>Livro: {titulo}</p>
                </div>
                <div className="flex gap-2">
                    <input className="h-auto" type="number" id="quantidadeEstoqueAdicionar" onChange={(e)=>{setQuantidade(parseInt(e.target.value))}} placeholder="Insira o valor para adicionar ao estoque" />
                    <button onClick={handleAddOnStock}>Adicionar</button>
                </div>
            </div>
        </div>
    )
}