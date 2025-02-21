import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as C from "./styles";

function Reset() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log("Token recebido na página de redefinição:", token);

  const handleNovaSenha = async () => {
    if (!novaSenha) {
      setError("Por favor, preencha a nova senha.");
      toast.error("Por favor, preencha a nova senha.");
      
      return;
    }

    if (!confirmaSenha) {
      setError("Por favor, confirme a senha.");
      toast.error("Por favor, confirme a senha.");
      
      return;
    }

    if (novaSenha !== confirmaSenha) {
      setError("As senhas devem ser iguais.");
      toast.error("As senhas devem ser iguais.");
      
      return;
    }

    setLoading(true);

    try {
      await axios.put(`http://localhost:8800/resetpassword/${token}`, { novaSenha });

      toast.success("Senha redefinida com sucesso!");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      toast.error("Erro ao redefinir senha. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <C.Container>
      <C.Title>Nova Senha</C.Title>
      <C.Content>
        <Input
          type="password"
          placeholder="Digite a nova senha"
          value={novaSenha}
          onChange={(e) => [setNovaSenha(e.target.value), setError("")]}
        />

        <Input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmaSenha}
          onChange={(e) => [setConfirmaSenha(e.target.value), setError("")]}
        />
        
        <C.LabelError>{error}</C.LabelError>

        <Button Text={loading ? "Enviando..." : "Redefinir Senha"} onClick={handleNovaSenha} disabled={loading} />
      </C.Content>
    </C.Container>
  );
}

export default Reset;
