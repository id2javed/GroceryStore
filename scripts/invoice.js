// Invoice Page Scripts
console.log('*** Invoice Page Script ***');

const renderProductDetails = document.getElementById('renderProductDetails');

try {
    const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
    connection.transaction(function(query) {
        query.executeSql(selectCustomerTable, [], function(sqlTransaction, sqlResultSet) {
            console.log("Result Set length: " + sqlResultSet.rows.length);
            if (sqlResultSet.rows.length > 0) {
                invoiceDetails(sqlResultSet);
            } else {
                console.log('No records found');
            }
        }, function(sqlTransaction, sqlError) {
            console.log("SQL Error : " + sqlError);
        });
    });
} catch (error) {
    console.log(error.message);
}

function invoiceDetails(resultSet) {
    let generateProductDetails = '<table class="table table-borderless" style="box-shadow: 1px 1px 10px 10px rgba(0,0,0,0.50);"><thead class="table-dark">';
    generateProductDetails = generateProductDetails + '<tr>';
    generateProductDetails = generateProductDetails + '<th> Bill Number </th>';
    generateProductDetails = generateProductDetails + '<th> Customer Name </th>';
    generateProductDetails = generateProductDetails + '<th> Mobile Number </th>';
    generateProductDetails = generateProductDetails + '<th> Purchase Date  </th>';
    generateProductDetails = generateProductDetails + '<th> View </th>';
    generateProductDetails = generateProductDetails + '</tr></thead><tbody>';
    for (let index = 0; index < resultSet.rows.length; index++) {
        generateProductDetails += '<tr>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).number + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).name + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).mobile + ' </b></td>';
        generateProductDetails += '<td> <b>' + resultSet.rows.item(index).date + ' </b></td>';
        generateProductDetails += '<td> <button class="btn btn-success btn-sm" type="button" onclick="billingDetails(' + resultSet.rows.item(index).number + ')"><i class="bi-eye"></i></button></td>';
        // generateProductDetails += '<td> <button class="btn btn-dark btn-sm" type="button" onclick="deleteBillingDetails(' + resultSet.rows.item(index).cid + ')"><i class="bi-trash"></i></button></td>';
        generateProductDetails += '</tr>';
    }
    generateProductDetails = generateProductDetails + '<tbody></table>';
    renderProductDetails.innerHTML = generateProductDetails;
}

function billingDetails(billNumber) {
    console.log("*** viewBillDetails: start ***" );
    sessionStorage.setItem("billingNumber", billNumber);
    location.href = '../pages/billingDetails.html';
    console.log("*** viewBillDetails: ended ***" );
}

function deleteBillingDetails(billNumber) {
    if (window.confirm("Are you sure?")) {
        try {
            const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
            connection.transaction(function(query) {
                console.log(deleteCustomerTable + billNumber);
                query.executeSql(deleteCustomerTable, [billNumber], function(tx, resultSet) {
                    console.log('Record deleted...');
                    // location.reload();
                }, null);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}
