import mysql from "mysql";

let db;

const connectDb = () => {
    db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "to_do"
    });

    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            setTimeout(connectDb, 2000); // Tenta reconectar após 2 segundos
        } else {
            console.log('Conectado ao banco de dados!');
        }
    });

    db.on('error', (err) => {
        console.error('Erro no banco de dados:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectDb(); // Recria a conexão em caso de perda
        } else {
            throw err;
        }
    });
};

connectDb();

export { db };

