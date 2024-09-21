import * as C from "./styles";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

function App() {

    const location = useLocation();
    const { onEdit } = location.state || {}; // Pega o estado se existir

    const [users, setUsers] = useState([]);
    const [onEditState, setOnEdit] = useState(onEdit || null); // Corrigido aqui

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8800/users");
            setUsers(res.data);
        } catch (error) {
            toast.error("Erro ao carregar os usuários.");
        }
    };

    useEffect(() => {
        getUsers();
    }, []); 

  

    return (
        <>
            <C.Container>
                <C.Title> {onEditState ? "Editar Usuário" : "Cadastre"}
                    <C.Strong>{!onEditState && <Link to="/login">&nbsp;Login</Link>}
                        
                    </C.Strong>
                </C.Title>
                <Form onEdit={onEditState} setOnEdit={setOnEdit} getUsers={getUsers} /> 
            </C.Container>
            <ToastContainer autoClose={3000} position="bottom-left" transition={Slide} />
        </>
    );
}

export default App;
