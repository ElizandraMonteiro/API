const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFULT CURRENT_TIMESTAMP
    )
`;

module.exports = createUsers;