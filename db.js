async function connect() {

    if(globalThis.connection && global.connection.state !== 'disconnected') {
        return glocal.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://user:password@host:port/bd");
    console.log("Conectou no MySQL");
    globalThis.connection = connection;

    return connection;
}

async function selectCustomers() {
    const conn = await connect(); 
    const [rows] = conn.query('SELECT * FROM clientes;');

    return await rows;
}

async function insertCustomer(customer) {
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome, idade, uf) VALUES (?,?,?);';
    const values = [customer.nome, customer.idade, customer.uf];
    
    await conn.query(sql, values);
}

async function updateCustomer(id, customer) {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?;';
    const values = [customer.nome, customer.idade, customer.uf, id];
    
    await conn.query(sql, values);
}

async function deleteCustomer(id) {
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';
    return await conn.query(sql, [id]);
}

module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer};