// Product Details Sctips

const textName = document.getElementById('productName');
const selectBrand = document.getElementById('productBrand');
const textPrice = document.getElementById('productPrice');
const productImage = document.getElementById('productImage');
const renderProductDetails = document.getElementById('renderProductDetails');
const displayMessage = document.getElementById('displayMessage');

try {
    const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
    connection.transaction(function(query) {
        query.executeSql(selectProductTable, [], function(sqlTransaction, sqlResultSet) {
            console.log("Result Set length: " + sqlResultSet.rows.length);
            if (sqlResultSet.rows.length > 0) {
                productDetails(sqlResultSet);
            } else {
                console.log('No records found');
            }
        }, function(sqlTransaction, sqlError) {
            console.log("SQL Error : " + sqlError);
        });
        // query.executeSql("DELETE FROM PRODUCTS");
    });
} catch (error) {
    console.log(error.message);
}

function searchProduct(inputControl) {
    const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
    let searchStatement = 'SELECT * FROM PRODUCTS WHERE NAME LIKE "%' + inputControl.value + '%"';
    connection.transaction(function(query) {
        query.executeSql(searchStatement, [], function(sqlTransaction, sqlResultSet) {
            displayMessage.innerHTML = '';
            renderProductDetails.innerHTML = '';
            if (sqlResultSet.rows.length > 0) {
                productDetails(sqlResultSet);
            } else {
                displayMessage.innerHTML = 'No Records Found';
                console.log('No records found');
            }
        }, function(sqlTransaction, sqlError) {
            console.log("SQL Error : " + sqlError);
        });
    });
}

function productDetails(resultSet) {
    let generateProductDetails = '<table class="table table-borderless" style="box-shadow: 1px 1px 10px 10px rgba(0,0,0,0.50);"><thead class="table-dark">';
    generateProductDetails = generateProductDetails + '<tr>';
    generateProductDetails = generateProductDetails + '<th> Category </th>';
    generateProductDetails = generateProductDetails + '<th> Sub Category </th>';
    generateProductDetails = generateProductDetails + '<th> Product </th>';
    generateProductDetails = generateProductDetails + '<th> Price </th>';
    generateProductDetails = generateProductDetails + '<th> Stock </th>';
    generateProductDetails = generateProductDetails + '<th> Edit </th>';
    generateProductDetails = generateProductDetails + '<th> Delete </th>';
    generateProductDetails = generateProductDetails + '</tr></thead><tbody>';
    for (let index = 0; index < resultSet.rows.length; index++) {
        generateProductDetails += '<tr>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).category + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).sub + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).name + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).price + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).stock + ' </b></td>';
        generateProductDetails += '<td> <button class="btn btn-success btn-sm" type="button" onclick="editProduct(' + resultSet.rows.item(index).pid + ')"><i class="bi-pencil"></i></button></td>';
        generateProductDetails += '<td> <button class="btn btn-dark btn-sm" type="button" onclick="deleteProduct(' + resultSet.rows.item(index).pid + ')"><i class="bi-trash"></i></button></td>';
        generateProductDetails += '</tr>';
    }
    generateProductDetails = generateProductDetails + '<tbody></table>';
    renderProductDetails.innerHTML = generateProductDetails;
}

function editProduct(productID) {
    console.log('edit product id : ' + productID);
    try {
        const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
        connection.transaction(function(query) {
            query.executeSql(selectStatement, [productID], function(tx, resultSet) {
                const productData = JSON.stringify({
                    pid: resultSet.rows.item(0).pid,
                    name: resultSet.rows.item(0).name,
                    category: resultSet.rows.item(0).category,
                    sub: resultSet.rows.item(0).sub,
                    price: resultSet.rows.item(0).price,
                    stock: resultSet.rows.item(0).stock
                });
                console.log(productData);
                sessionStorage.setItem('productData', productData);
                location.href = '../pages/addProduct.html';
            }, null);
        });
    } catch (error) {
        console.log(error.message);
    }
}

function deleteProduct(productID) {
    if (window.confirm("Are you sure?")) {
        try {
            const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
            connection.transaction(function(query) {
                query.executeSql(deleteProductTable, [productID], function(tx, resultSet) {
                    location.reload();
                }, null);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}
