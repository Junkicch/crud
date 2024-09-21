import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as C from "./styles";
import { AuthContext } from "../Contexts/auth";

const FormTODO = ({ onEdit, setOnEdit, getTODO }) => {
    const { user } = useContext(AuthContext);
    const [Titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (onEdit) {
            setTitulo(onEdit.Titulo);
            setDescricao(onEdit.descricao);
        } else {
            setTitulo("");
            setDescricao("");
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Titulo || !descricao) {
            return toast.warn("Preencha todos os campos");
        }

        try {
            if (onEdit) {
                // Editar tarefa existente
                await axios.put(`http://localhost:8800/todos/` + onEdit.idToDo, {
                    Titulo,
                    descricao,
                });
                toast.success("Tarefa atualizada com sucesso");
            } else {
                // Adicionar nova tarefa
                await axios.post("http://localhost:8800/todos", {
                    Titulo,
                    descricao,
                    idUsuarios: user.id, // Envia o ID do usuário autenticado
                });
                toast.success("Tarefa adicionada com sucesso");
            }

            // Limpa os campos após o envio
            setTitulo("");
            setDescricao("");
            setOnEdit(null);
            getTODO(); // Atualiza a lista de tarefas
        } catch (error) {
            toast.error(error.response?.data || "Erro ao salvar a tarefa");
        }
    };

    return (
        <C.FormContainer onSubmit={handleSubmit}>
            <C.InputArea>
                <C.Label htmlFor="titulo">Título</C.Label>
                <C.Input
                    id="titulo"
                    name="Titulo"
                    value={Titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </C.InputArea>
            <C.InputArea>
                <C.Label htmlFor="descricao">Descrição</C.Label>
                <C.Input
                    id="descricao"
                    name="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </C.InputArea>

            <C.Button type="submit">Salvar</C.Button>
        </C.FormContainer>
    );
};

export default FormTODO;
