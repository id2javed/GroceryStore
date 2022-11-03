// Billing Details Script

console.log('*** Billing Details Script ***');
const renderProductDetails = document.getElementById('renderProductDetails');

try {
    const billingNumber = sessionStorage.getItem('billingNumber');
    if(billingNumber !== null) {
        const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
        connection.transaction(function(query) {
            query.executeSql(selectCustomesTable, [billingNumber], function(sqlTransaction, sqlResultSet) {
                console.log("Result Set length: " + sqlResultSet.rows.length);
                if (sqlResultSet.rows.length > 0) {
                    billingDetails(sqlResultSet);
                } else {
                    console.log('No records found');
                }
            }, function(sqlTransaction, sqlError) {
                console.log("SQL Error : " + sqlError);
            });
        });
    } else {
        console.log('Bill number not found...');
    }
} catch (error) {
    console.log(error.message);
}

function billingDetails(resultSet) {
    try {
        let generateProductDetails = '<table class="table table-borderless" style="box-shadow: 1px 1px 10px 10px rgba(0,0,0,0.50);"><thead class="table-dark">';
        generateProductDetails = generateProductDetails + '<tr>';
        generateProductDetails = generateProductDetails + '<th> Category </th>';
        generateProductDetails = generateProductDetails + '<th> Sub Category </th>';
        generateProductDetails = generateProductDetails + '<th> Product </th>';
        generateProductDetails = generateProductDetails + '<th> Price </th>';
        generateProductDetails = generateProductDetails + '<th> Quantity </th>';
        generateProductDetails = generateProductDetails + '<th> Total </th>';
        generateProductDetails = generateProductDetails + '</tr></thead><tbody>';   
 
        let totalCost = 0.0;
        for (let index = 0; index < resultSet.rows.length; index++) {
            generateProductDetails += '<tr>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).category + ' </b></td>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).sub + ' </b></td>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).prodcut + ' </b></td>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).price + ' </b></td>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).quantity + ' </b></td>';
            generateProductDetails += '<td> <b>' + resultSet.rows.item(index).total + ' </b></td>';
            totalCost = totalCost + resultSet.rows.item(index).total;
            generateProductDetails += '</tr>';
        }         
        generateProductDetails = generateProductDetails + '<tr>';
        generateProductDetails = generateProductDetails + '<th>  </th>';
        generateProductDetails = generateProductDetails + '<th>  </th>';
        generateProductDetails = generateProductDetails + '<th>  </th>';
        generateProductDetails = generateProductDetails + '<th>  </th>';
        generateProductDetails = generateProductDetails + '<th> Total Cost </th>';
        generateProductDetails = generateProductDetails + '<td> <b>' + totalCost + '</b> </td>';
        generateProductDetails = generateProductDetails + '</tr>';
        generateProductDetails = generateProductDetails + '<tbody></table>';
        renderProductDetails.innerHTML = generateProductDetails;
    } catch (error) {
        console.log(error.message);
    }
}
