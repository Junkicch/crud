import express from "express";
import { 
  getUsers, addUser, updateUser, deleteUser, 
  getTODO, addTODO, updateTODO, deleteTODO, validaTODO, newDay, 
  getData 
} from "../controllers/user.js";

const router = express.Router();

// Rotas para usuários
router.get("/users", getUsers);                
router.post("/users", addUser);                
router.put("/users/:id", updateUser);          
router.delete("/users/:id", deleteUser);       

// Rotas para tarefas TODO
router.get("/todos/:idUsuarios", (req, res) => {
  console.log("Requisição recebida para getTODO:", req.params.idUsuarios);
  getTODO(req, res);
});   
router.post("/todos", addTODO);                
router.put("/todos/:idToDo", updateTODO);      
router.delete("/todos/:idToDo", deleteTODO);   
router.put("/todos/validate/:idToDo", validaTODO); 


router.get("/data", getData);                  
router.put("/reset", newDay);                 
export default router;
