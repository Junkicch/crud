import React, { useState } from "react"; 
import axios from "axios";
import { FaTrash, FaEdit, FaRegSquare, FaCheck, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import * as C from "./styles";

const GridTODO = ({ ToDo, setToDo, setOnEdit }) => {
    const [expandedItem, setExpandedItem] = useState(null); // Estado para controlar dropdowns expandidos

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (idToDo) => {
        try {
            const { data } = await axios.delete(`http://localhost:8800/todos/` + idToDo);
            const newArray = ToDo.filter((todo) => todo.idToDo !== idToDo); // Usando 'ToDo'
            setToDo(newArray); // Atualiza o estado correto
            toast.success(data);
        } catch (error) {
            toast.error(error.response?.data || "Erro ao deletar a tarefa");
        }
    };

    const handleVerification = async (idToDo, feito) => {
        try {
            await axios.put(`http://localhost:8800/todos/validate/` + idToDo);
            const updatedToDo = ToDo.map((todo) => todo.idToDo === idToDo ? { ...todo, feito: !feito } : todo);
            setToDo(updatedToDo);
            toast.success("Tarefa verificada com sucesso!");
        } catch (error) {
            toast.error(error.response?.data || "Erro ao verificar a tarefa");
        }
    };

    const handleDropDown = (idToDo) => {
        setExpandedItem(expandedItem === idToDo ? null : idToDo); // Alterna entre expandido/fechado
    };

    return (
        <C.Table>
            <C.Thead>
                <C.Tr>
                   
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {ToDo.map((item, i) => (
                    <React.Fragment key={i}>
                        <C.Tr>
                            <C.Td alignCenter width="5%">
                                <FaChevronDown 
                                    onClick={() => handleDropDown(item.idToDo)} 
                                    aria-label={expandedItem === item.idToDo ? "Fechar" : "Expandir"}
                                />
                            </C.Td>
                            <C.Td width="30%">{item.Titulo}</C.Td>
                            <C.Td width="20%">{item.feito ? "Feito" : "Pendente"}</C.Td>
                            <C.Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} aria-label={`Editar ${item.Titulo}`} />
                                </C.Td>
                            <C.Td alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.idToDo)} aria-label={`Excluir ${item.Titulo}`} />
                                </C.Td>

                                <C.Td alignCenter width="5%">{item.feito ? (
                                    <FaCheck onClick={() => handleVerification(item.idToDo, item.feito)} aria-label="Marcar como não feito" />
                                ) : (
                                <FaRegSquare onClick={() => handleVerification(item.idToDo, item.feito)} aria-label="Marcar como feito" />)}
                                </C.Td>

                        </C.Tr>
                        {expandedItem === item.idToDo && (
                            <C.Tr>
                                <C.Td colSpan={6}>{item.descricao}</C.Td>
                            </C.Tr>
                        )}
                    </React.Fragment>
                ))}
            </C.Tbody>
        </C.Table>
    );
};

export default GridTODO;