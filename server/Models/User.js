const connection = require('../config/connection')

const User = {
    create: (userData, callback) => {
        connection.query('INSERT INTO users SET ?', userData, callback);
    },
    findByUsernameOrEmail: (username, email, callback) => {
        const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
        connection.execute(query, [username, email], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.execute(query, [email], callback);
    }
}

module.exports = User