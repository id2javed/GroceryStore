// Customer Billing System Script

console.log('*** Customer Billing System Script ***');

const txtBillNumber = document.getElementById('txtBillNumber');
const spanBillNumber = document.getElementById('spanBillNumber');
const txtPurchaseDate = document.getElementById('txtPurchaseDate');
const spanPurchaseDate = document.getElementById('spanPurchaseDate');
const txtCustomerName = document.getElementById('txtCustomerName');
const spanCustomerName = document.getElementById('spanCustomerName');
const txtMobileNumber = document.getElementById('txtMobileNumber');
const spanMobileNumber = document.getElementById('spanMobileNumber');
const customerForm = document.getElementById('customerForm');
const displayMessage = document.getElementById('displayMessage');
const renderProductDetails = document.getElementById('renderProductDetails');

txtBillNumber.value = Math.floor(Math.random() * 100000) + 1;
txtPurchaseDate.value = new Date().toDateString();

function billGenerator() {
    try {
        const product = sessionStorage.getItem('productDetail');
        if(product !== null) {
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
            const productDetail = JSON.parse(product);
            productDetail.map(product => {
                generateProductDetails += '<tr>';
                generateProductDetails += '<td> <b>' + product.category + ' </b></td>';
                generateProductDetails += '<td> <b>' + product.sub + ' </b></td>';
                generateProductDetails += '<td> <b>' + product.name + ' </b></td>';
                generateProductDetails += '<td> <b>' + product.price + ' </b></td>';
                generateProductDetails += '<td> <b>' + product.quantity + ' </b></td>';
                generateProductDetails += '<td> <b>' + product.total + ' </b></td>';
                totalCost = totalCost + product.total;
                generateProductDetails += '</tr>';
            });
         
            generateProductDetails = generateProductDetails + '<tr>';
            generateProductDetails = generateProductDetails + '<th>  </th>';
            generateProductDetails = generateProductDetails + '<th>  </th>';
            generateProductDetails = generateProductDetails + '<th>  </th>';
            generateProductDetails = generateProductDetails + '<th>  </th>';
            generateProductDetails = generateProductDetails + '<th> Total Cost </th>';
            generateProductDetails = generateProductDetails + '<td> <b>' + totalCost + ' </b></td>';
            generateProductDetails = generateProductDetails + '</tr>';
            generateProductDetails = generateProductDetails + '<tbody></table>';
            renderProductDetails.innerHTML = generateProductDetails;
        } else {
            let generateProductDetails = '<table class="table table-borderless table-light border"><thead class="table-dark">';
            generateProductDetails = generateProductDetails + '<tr class="bg-danger">';
            generateProductDetails = generateProductDetails + '<th> <font color="white">No bill to generate</font></th>';
            generateProductDetails = generateProductDetails + '</tr>';
            generateProductDetails = generateProductDetails + '</table>';
            renderProductDetails.innerHTML = generateProductDetails;
        }
    } catch (error) {
        console.log(error.message);
    }
}

function isFormEmpty() {
    if (isEmpty(txtBillNumber.value)) {
        spanBillNumber.innerHTML = "*";
		txtBillNumber.focus();
        return false;
    } else if (isEmpty(txtPurchaseDate.value)) {
        spanPurchaseDate.innerHTML = "*";
		txtPurchaseDate.focus();
        return false;
    } else if (isEmpty(txtCustomerName.value)) {
        spanCustomerName.innerHTML = "*";
		txtCustomerName.focus();
		return false;
    } else if (isEmpty(txtMobileNumber.value)) {
        spanMobileNumber.innerHTML = "*";
		txtMobileNumber.focus();
		return false;
    } else if (txtMobileNumber.value.length < 10) {
        spanMobileNumber.innerHTML = "*";
		txtMobileNumber.focus();
		return false;
    } else {
        return true;
    }
}

function isValidName(event) {
    if (isNumeric(event) == true) {
		spanCustomerName.innerHTML = "*";
	} else {
		spanCustomerName.innerHTML = "";
	}
}

function isValidMobile(event) {
    if(isLettersLength(event) == true) {
        spanMobileNumber.innerHTML = "*";
    } else {
        spanMobileNumber.innerHTML = "";
    }
}

function generateBill() {
    if(isFormEmpty() === true) {
        const productDetail = sessionStorage.getItem('productDetail');
        if(productDetail !== null) {
            let billingData = [];
            JSON.parse(productDetail).map(productData => {
                billingData = [
                    txtCustomerName.value, 
                    txtBillNumber.value, 
                    txtMobileNumber.value, 
                    txtPurchaseDate.value 
                ];
                billingData.push(productData.category);
                billingData.push(productData.sub);
                billingData.push(productData.name);
                billingData.push(productData.quantity);
                billingData.push(productData.price);
                billingData.push(productData.total);
                addBillIntoDatabase(billingData);
            });
            billGenerator();
            customerForm.reset();
            sessionStorage.removeItem('productDetail');
            // displayMessage.innerHTML = 'Customer bill generated';
            // displayMessage.style.backgroundColor = '#defdef';
        } else {
            displayMessage.innerHTML = 'No bill to generate';
            displayMessage.style.backgroundColor = '#bedbed';
            setTimeout(function() {
                displayMessage.innerHTML = '';
            }, 4000);
        }
    }
}

function addBillIntoDatabase(billingData) {
    try {
        createDatabaseTableIfNotExists(createCustomerTable);
        executeDatabaseStatement(connection, insertCustomerTable, billingData);
    } catch (error) {
        console.log(error.message);
    }
}

