const http = require('http');
const mysql = require('mysql2');

const DATABASE_URL = `mysql://4fpyhaslthjr7gjn6qoz:pscale_pw_fgYML7NPBj1Tcm804urlTf8h1Hq9PHYeQ9rCqsrxhnT@aws.connect.psdb.cloud/nomes?ssl={"rejectUnauthorized":true}`
let connection;

const servidorWEB = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204; // No Content
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json')

    if(req.url === '/api'){
        connection.query(`select * from pessoa;`, [], (err, rows) => {
            res.statusCode = 200
            res.end(JSON.stringify(rows));
        })
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({mensagem: "Rota não encontrada"}));
    }
})

servidorWEB.listen(5000, () => {
    console.log("Servidor tá ON meu chapa!")
    connection = mysql.createConnection(DATABASE_URL)
})

