// Common Constant Scripts
console.log('*** Common Constant Scripts ***');

/********** Database Constants **********/
const databaseName = "GSDB";
const databaseVersion = "1.0";
const databaseDescription = "Grocery Store Management System";
const databaseSize = "1 * 1024 * 1024";

/********** Product Query Constants **********/
const createProductTable = 'CREATE TABLE IF NOT EXISTS products (pid INTEGER PRIMARY KEY, name, category, sub, price, stock)';
const insertProductTable = 'INSERT INTO products (name, category, sub, price, stock) VALUES (?, ?, ?, ?, ?)';
const updateProductTable = 'UPDATE products SET name=?, category=?, sub=?, price=?, stock=? WHERE pid=?';
const selectProductTable = 'SELECT * FROM products';
const selectStatement    = 'SELECT * FROM products WHERE pid = ?';
const selectProductPrice = 'SELECT price FROM products WHERE name = ?';
const deleteProductTable = 'DELETE FROM products WHERE pid = ?';

/********** Customer Query Constants **********/
const createCustomerTable = 'CREATE TABLE IF NOT EXISTS customers (cid INTEGER PRIMARY KEY, name, number, mobile, date, category, sub, prodcut, quantity, price, total)';
const insertCustomerTable = 'INSERT INTO customers (name, number, mobile, date, category, sub, prodcut, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
const updateCustomerTable = 'UPDATE customers SET name=?, number=?, mobile=?, date=?, category=?, sub=?, prodcut=?, quantity=?, price=?, total=? WHERE cid=?';
const selectCustomerTable = 'SELECT DISTINCT name, number, mobile, date FROM customers';
const selectCustomesTable = 'SELECT * FROM customers WHERE number = ?';
const deleteCustomerTable = 'DELETE FROM customers WHERE number = ?';
