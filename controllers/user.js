import { db } from "../db.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

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

export const getEmail = (req, res) => {
  const email = req.params.email;
  const q = "SELECT email FROM Usuarios WHERE email=?";

  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const forgotPassword = (req, res) => {
  console.log("forgotpassword chamado");
  const email = req.params.email;
  const token = crypto.randomBytes(20).toString("hex");
  const token_expires = new Date(Date.now() + 3600000);

  console.log("Token:", token);
  console.log("Email:", email);
  console.log("Tokenex:", token_expires);
  const q = "UPDATE Usuarios SET token = ?, tokenex = ? WHERE email = ?";

  db.query(q, [token, token_expires, email], (err, data) => {
    console.log("resultado:", data);
    if (err) { return res.status(500).json(err); }
    
  })
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "joaolins2206@gmail.com",
      pass: "omwxvmjkhibverzr"
    }
  })

  const mailOptions = {
    from: "Suporte",
    to: email,
    subject: "Redefinição de Senha",
    html: `
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p>Clique no link abaixo para continuar:</p>
      <a href="http://localhost:3000/resetpassword/${token}">Redefinir Senha</a>

      <p>Este link expira em 1 hora.</p>
      <p>Caso não tenha solicitado, ignore este e-mail.</p>
      `
  };

  transporter.sendMail(mailOptions, (err) => {
    if (error) {
      console.error("Email sending failed:", err);
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Se o e-mail estiver cadastrado, você receberá um link de recuperação."
    })
  })

};


export const resetPassword = (req, res) => {
  console.log("resetPassword chamado");
  console.log("Token:", req.params.token);
  console.log("Nova senha:", req.body.novaSenha);
  const token = req.params.token;
  const { novaSenha } = req.body;

  if (!token || !novaSenha) {
    return res.status(400).json({ error: "Token e nova senha são obrigatórios." });
  }

  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      console.error("Erro ao gerar salt:", saltErr);
      return res.status(500).json({ error: "Erro ao gerar salt." });
    }

    bcrypt.hash(novaSenha, salt, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Erro ao hash a senha:", hashErr);
        return res.status(500).json({ error: "Erro ao hash a senha." });
      }

      const q = "UPDATE Usuarios SET senha=?, token=NULL, tokenex=NULL WHERE token=? AND tokenex > NOW()";

      db.query(q, [hashedPassword, token], (err, data) => {
        if (err) {
          console.error("Erro ao atualizar a senha:", err);
          return res.status(500).json(err);
        }

        console.log("Resultado da query:", data);
        if (data.affectedRows === 0) {
          return res.status(400).json({ error: "Token inválido ou expirado." });
        }

        return res.status(200).json({ message: "Senha redefinida com sucesso!" });
      });
    });
  });
};
