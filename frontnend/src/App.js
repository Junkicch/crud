import Global from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import RouteApp from "./routes";
import { AuthProvider } from "./Contexts/auth";



function App() {
 
  return (
    <>
    <AuthProvider>
    <RouteApp />
    

      <Global/>
      </AuthProvider>
    </>
  );
}

export default App;
