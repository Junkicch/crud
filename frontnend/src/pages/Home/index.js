import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import GridTODO from '../../components/GridTODO';
import FormTODO from '../../components/FormTODO';
import { AuthContext } from '../../Contexts/auth';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";


import * as C from "./styles";

function Home() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [ToDo, setToDo] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função para buscar as tarefas TODO
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

    const handleDelete = async () => {
        try{
        await axios.delete("http://localhost:8800/users/" + user.id);
        toast.success();
        signout();
        navigate("/");
    }catch (error){
        toast.error("Erro ao excluir o perfil");
        console.error("Erro ao excluir o perfil:", error);
    }

    };

    useEffect(() => {
        const fetchDataAndUpdateDay = async () => {
            try {
                const response = await axios.get("http://localhost:8800/data");
                const dataHjFromDB = response.data[0].dataHj; 
                const today = new Date();
                const datehj = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

                if (dataHjFromDB !== datehj) {
                    await axios.put("http://localhost:8800/reset"); 
                }
            } catch (error) {
                console.error("Erro ao buscar a data ou ao chamar newDay:", error);
            }
        };
    
        fetchDataAndUpdateDay();
        getTODO(); // Chama a função para buscar as tarefas
    }, []);

    const handleDropDown = () => {
        setIsMenuOpen((prevState) => !prevState); // Alterna entre expandido/fechado
    };



    return (
        <C.Container>
            <C.Title>To do
          <C.Strong>
          <FaBars onClick={handleDropDown} style={{cursor: "pointer"}}/> 
                    {isMenuOpen && (
                        <C.Table> 
                            <C.Td>
                            <C.Tr onClick={() => { navigate("/cadastro", { state: { onEdit: user } });}} >Editar Perfil</C.Tr>
                            
                                <C.Tr onClick={handleDelete}>Excluir Perfil</C.Tr>
                            
                                <C.Tr onClick={() => { signout(); navigate("/"); } } style={{color: "red"}}>Sair</C.Tr>
                            </C.Td>
                        </C.Table>
                    )}
          </C.Strong>
        </C.Title>
            <FormTODO onEdit={onEdit} setOnEdit={setOnEdit} getTODO={getTODO} />
            <GridTODO setOnEdit={setOnEdit} ToDo={ToDo} setToDo={setToDo} />
            
        </C.Container>
    );
}

export default Home;
