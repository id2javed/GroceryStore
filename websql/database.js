// Common Database Scripts
console.log('*** Common Database Scripts ***');
var connection = null;

/********** Common Database Table **********/
function createDatabaseTableIfNotExists(createStatement) {
    connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
    connection.transaction(function (query) {
        console.log('createStatement: ' + createStatement);
        query.executeSql(createStatement);
        console.log('success');
    });
}

/********** Common Database Statements **********/
function executeDatabaseStatement(connection, parameterizedStatement, parameterVaules) {
    try {
        connection.transaction(function (query) {
            console.log('parameterizedStatement: ' + parameterizedStatement);
            console.log('parameterVaules: ' + parameterVaules);
            query.executeSql(parameterizedStatement, parameterVaules, function(sqlTransaction, sqlResultSet) {
                console.log('Success');
            }, function(sqlTransaction, sqlError) {
                console.log('Failure');
            });
        });
    } catch (error) {
        console.log(error.message);
    }
}
