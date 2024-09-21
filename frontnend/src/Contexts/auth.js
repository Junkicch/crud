import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Recupera o token e os usuários armazenados localmente
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");

        if (userToken && userStorage) {
            // Verifica se o token corresponde a algum usuário no banco de dados local
            const hasUser = JSON.parse(userStorage)?.find(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) {
                setUser(hasUser);
            }
        }
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await axios.get("http://localhost:8800/users"); // Ajuste a URL conforme sua API
            const userStorage = response.data; // Acessa os dados retornados da API

            // Verifica se o usuário existe no banco de dados retornado
            const hasUser = userStorage?.find((user) => user.email === email);

            if (hasUser) {
                // Verifica se a senha está correta
                if (hasUser.senha === senha) {
                    const token = Math.random().toString(36).substring(2);
                    localStorage.setItem("user_token", JSON.stringify({ email, token, id: hasUser.idUsuarios }));
                    localStorage.setItem("users_db", JSON.stringify(userStorage));
                    setUser({ email, senha, id: hasUser.idUsuarios });
                    return;
                } else {
                    return "E-mail ou senha incorretos";
                }
            } else {
                return "Usuário não encontrado";
            }
        } catch (error) {
            console.error("Erro ao autenticar:", error);
            return "Erro ao autenticar. Tente novamente.";
        }
    };


    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        
        <AuthContext.Provider value={{ user, signed: !!user, login, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
