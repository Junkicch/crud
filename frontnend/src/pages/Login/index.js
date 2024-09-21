import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as C from "./styles";
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Alterando handleLogin para ser uma função assíncrona
  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha os campos");
      return;
    }

    try {
      // Aguarde o login ser processado
      const res = await login(email, senha);

      // Se houver um erro no login, mostrar a mensagem
      if (res) {
        setError(res);
        return;
      }

      // Navegar para a home se o login for bem-sucedido
      navigate("/home");
    } catch (error) {
      setError("Erro ao tentar realizar o login. Tente novamente.");
    }
  };

  return (
    <C.Container>
      <C.Label>Sistema de login</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password" // Corrigido para "password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelCadastro>Novo por aqui?
          <C.Strong>
            <Link to="/cadastro">&nbsp;Cadastre-se</Link>
          </C.Strong>
        </C.LabelCadastro>
      </C.Content>
    </C.Container>
  );
};

export default Login;
