const db = require('./db');

(async () => {

    console.log("Começou");

    const clientes = await db.selectCustomers();
    console.log(clientes);


    await db.insertCustomer({nome: "Nath", idade: 27, uf: "SP"});

    await db.updateCustomer(id, {nome: "Nath", idade: 27, uf: "SP"});

    await db.deleteCustomer(id);

})();