const JkMysql = require('jkmysql-easy');

// make connection between server and mysql database
// change `yourDB` to your Database you use in Mysql
const connection = JkMysql.ConnectToDatabase('localhost', 'root', '1234', 'yourDB')

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection