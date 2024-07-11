const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        host : 'bxu3nnsu4nmgp1wnvwok-mysql.services.clever-cloud.com',
        user: 'ursaevpk1bvvbqei',
        password : 'NX5rj3PpYCQfCMNj94Wy',
        database: 'bxu3nnsu4nmgp1wnvwok'
    });


    connection.connect((err) => 
    {
        if(err)
        {
            console.error("ERROR conectando a la base de datos", err);
            return;
        }

        console.log("Conectado EXITOSAMENTE a la base de datos"); 

    });


module.exports = connection;