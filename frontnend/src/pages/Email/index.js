import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as C from "./styles";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

function Email() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = async () => {
    if (!email) {
      setError("Por favor, preencha o e-mail.");
      toast.error("Por favor, preencha o e-mail.");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.get(`http://localhost:8800/email/` + email);


      if (!response.data || response.data.length === 0) {
        setError("Usuário não encontrado.");
        toast.error("Usuário não encontrado.");
        setLoading(false);
        setEmail("");
        return;
      }else{

      await axios.put(`http://localhost:8800/forgotpassword/` + email);

      setEmail("");
      setLoading(false);
      navigate("/login");
    }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
      toast.error("Erro ao enviar solicitação. Tente novamente.");
      setLoading(false);
    } 
  };

  return (
    <C.Container>
      <C.Title>Recuperar Senha</C.Title>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Link to="/cadastro">&nbsp;Cadastre-se</Link>

        <Button Text={loading ? "Enviando..." : "Enviar"} onClick={handleEmail} disabled={loading} />
      </C.Content>
    </C.Container>
  );
}

export default Email;
