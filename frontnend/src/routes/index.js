import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import useAuth from "../hooks/useAuth";


const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />;
}
const RouteApp = () =>{
    return(
        <BrowserRouter>
        <Fragment>
            <Routes>
                <Route exact path="/home" element={<Private Item={Home} />}  />
                <Route path="/" element={<Cadastro />} />
                <Route exact path="/cadastro" element={<Cadastro />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Fragment>
        </BrowserRouter>
    );
};

export default RouteApp;