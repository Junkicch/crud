import * as C from "./styles";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormTODO from "../../components/FormTODO";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../../Contexts/auth';

import { useLocation } from 'react-router-dom';

function Edit() {

    const location = useLocation();
    const { onEdit } = location.state || {}; // Pega o estado se existir
    const { user } = useContext(AuthContext);
    const [ToDo, setToDo] = useState([]);

    const [onEditState, setOnEdit] = useState(onEdit || null); // Corrigido aqui

    const getTODO = async () => {
        try {
            if (user?.id) {
                const response = await axios.get(`http://localhost:8800/todos/${user.id}`);
                setToDo(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
            // Adicionar feedback visual para erros
        }
    };

    useEffect(() => {
        getTODO();
      }, [user]);


  

    return (
        <>
            <C.Container>
                <C.Title> {onEditState ? "Editar Tarefa" : "Cadastre"}
                </C.Title>
                <FormTODO onEdit={onEdit} setOnEdit={setOnEdit} getTODO={getTODO} />
            </C.Container>
            <ToastContainer autoClose={3000} position="bottom-left" transition={Slide} />
        </>
    );
}

export default Edit;
