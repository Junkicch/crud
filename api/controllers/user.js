import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
  
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      return res.status(200).json(data);
    });
  };

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `senha`, `dataNasc`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.senha,
    req.body.dataNasc,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `senha` = ?, `dataNasc` = ? WHERE `idUsuarios` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.senha,
    req.body.dataNasc,
  ];

  db.query(q, [...values, req.params.idUsuarios], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idUsuarios` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
  
};


export const getTODO = (req, res) => {
  console.log("ID do usuário:", req.params.idUsuarios);
  const q = "SELECT * FROM ToDo WHERE `idUsuarios` = ?";
  db.query(q, [req.params.idUsuarios], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const addTODO = (req, res) => {
  const q = "INSERT INTO ToDo(`Titulo`, `descricao`, `idUsuarios`) VALUES(?)"; 
  const values = [
    req.body.Titulo,
    req.body.descricao,
    req.body.idUsuarios,
  ];
  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Tarefa criada com sucesso.");
  });
};


// Atualiza uma tarefa existente
export const updateTODO = (req, res) => {
  const q = "UPDATE ToDo SET `Titulo` = ?, `descricao` = ? WHERE `idToDo` = ?";

  const values = [
    req.body.Titulo,
    req.body.descricao,
  ];

  db.query(q, [...values, req.params.idToDo], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

// Deleta uma tarefa existente
export const deleteTODO = (req, res) => {
  const q = "DELETE FROM ToDo WHERE `idToDo` = ?";

  db.query(q, [req.params.idToDo], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};

export const validaTODO = (req, res) => {
  const q = "UPDATE ToDo SET `feito` = 1, `dataFeito` = NOW() WHERE `idToDo` = ?";

  db.query(q, [req.params.idToDo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("Tarefa não encontrada."); 
    }

    return res.status(200).json("Tarefa marcada como feita.");
  });
};

export const newDay = (_, res) => {
  const q = "UPDATE ToDo SET feito = 0, dataFeito = NULL"; 

  db.query(q, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); 
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("Nenhuma tarefa foi atualizada.");
    }

    return res.status(200).json(`${result.affectedRows} tarefas redefinidas para não feitas.`);
  });
};

export const getData = (_, res) => {
  const q = "SELECT dataHj FROM ToDo";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err); 

    return res.status(200).json(data); 
  });
};


