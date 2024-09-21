import React, { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as C from "./styles";





const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;
    
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.senha.value = onEdit.senha;
            user.dataNasc.value = onEdit.dataNasc;
    
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;
        if(
            !user.nome.value ||
            !user.email.value ||
            !user.senha.value ||
            !user.dataNasc.value 
        ) {
            return toast.warn("Preencha todos os campos")
        }

        if (onEdit) {
            await axios
              .put("http://localhost:8800/users/" + onEdit.idUsuarios, {
                nome: user.nome.value,
                email: user.email.value,
                senha: user.senha.value,
                dataNasc: user.dataNasc.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
              
          } else {
            await axios
              .post("http://localhost:8800/users", {
                nome: user.nome.value,
                email: user.email.value,
                senha: user.senha.value,
                dataNasc: user.dataNasc.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          }

        user.nome.value = "";
        user.email.value = "";
        user.senha.value = "";
        user.dataNasc.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <C.FormContainer ref={ref} onSubmit={handleSubmit}>
            <C.InputArea>
            <C.Label>Nome</C.Label>
            <C.Input name="nome" />
            </C.InputArea>
            <C.InputArea>
            <C.Label>Email</C.Label>
            <C.Input name="email" type="email" />
            </C.InputArea>
            <C.InputArea>
            <C.Label>Senha</C.Label>
            <C.Input name="senha" />
            </C.InputArea>
            <C.InputArea>
            <C.Label>Data de Nascimento</C.Label>
            <C.Input name="dataNasc" type="date" />
            </C.InputArea>

            <C.Button type="submit">Salvar</C.Button>
        </C.FormContainer>

    );
};

export default Form;