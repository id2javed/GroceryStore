// Product Page Scripts
console.log('*** Product Page Script ***');

const selectCategory = document.getElementById('selectCategory');
const spanProductCategory = document.getElementById('spanProductCategory');
const selectSubCategory = document.getElementById('selectSubCategory');
const spanProductSubCategory = document.getElementById('spanProductSubCategory');
const selectProductName = document.getElementById('selectProductName');
const spanProductName = document.getElementById('spanProductName');
const txtProductPrice = document.getElementById('txtProductPrice');
const spanProductPrice = document.getElementById('spanProductPrice');
const txtProductStock = document.getElementById('txtProductStock');
const spanProductStock = document.getElementById('spanProductStock');
const productForm = document.getElementById('productForm');
const displayMessage = document.getElementById('displayMessage');

function isValidPrice(event) {
	if (isLetters(event) == true) {
		spanProductPrice.innerHTML = "*";
	} else {
		spanProductPrice.innerHTML = "";
	}
}

function isValidStock(event) {
	if (isLetters(event) == true) {
		spanProductStock.innerHTML = "*";
	} else {
		spanProductStock.innerHTML = "";
	}
}

function isFormEmpty() {
    if (isEmpty(selectCategory.value)) {
        spanProductCategory.innerHTML = "*";
		selectCategory.focus();
        return false;
    } else if (isEmpty(selectSubCategory.value)) {
        spanProductSubCategory.innerHTML = "*";
		selectSubCategory.focus();
        return false;
    } else if (isEmpty(selectProductName.value)) {
        spanProductName.innerHTML = "*";
		selectProductName.focus();
		return false;
    } else if (isEmpty(txtProductPrice.value)) {
        spanProductPrice.innerHTML = "*";
		txtProductPrice.focus();
        return false;
    } else if (isEmpty(txtProductStock.value)) {
        spanProductStock.innerHTML = "*";
		txtProductStock.focus();
        return false;
    } else {
        return true;
    }
}

function onChangeCategory() {
    selectSubCategory.innerHTML = '<option value="">Select Sub Category</option>';
    if(selectCategory.value === 'Basket') {
        const category = ["Vegetables", "Fruites", "Poultry"];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectSubCategory.appendChild(option);
        }
    } else if(selectCategory.value === 'Freezer') {
        const category = ["Drinks", "Juices"];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectSubCategory.appendChild(option);
        }
    } else if(selectCategory.value === 'Pantry') {
        const category = ["Poultry"];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectSubCategory.appendChild(option);
        }
    }
}

function onChangeSubCategory() {
    console.log('onchange value: ' + selectSubCategory.value);
    selectProductName.innerHTML = '<option value="">Select Product</option>';
    if(selectSubCategory.value === 'Vegetables') {
        const category = ['Bean', 'Capsicum', 'Onion', 'Potato', 'Spinach', 'Tomato'];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectProductName.appendChild(option);
        }
    } else if(selectSubCategory.value === 'Fruites') {
        const category = ['Apple', 'Banana', 'Kiwi', 'Papaya', 'Pineapple', 'Watermelon'];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectProductName.appendChild(option);
        }
    } else if(selectSubCategory.value === 'Poultry') {
        const category = ['Eggs', 'Chicken-Beast', 'Chicken-Legpiece'];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectProductName.appendChild(option);
        }
    } else if(selectSubCategory.value === 'Drinks') {
        const category = ['Coca-cola', 'Limca', 'Sprite'];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectProductName.appendChild(option);
        }
    } else if(selectSubCategory.value === 'Juices') {
        const category = ['Coconut', 'Lemon', 'Mango', 'Orange', 'Pineapple'];
        for(let i = 0; i < category.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = category[i];
            option.value = category[i];
            selectProductName.appendChild(option);
        }
    }
}

function addProduct() {
    if (isFormEmpty() == true) {
        const productData = [
            selectProductName.value, 
            selectCategory.value, 
            selectSubCategory.value, 
            txtProductPrice.value, 
            txtProductStock.value 
        ];
        addProductIntoDatabase(productData);
        productForm.reset();
        // location.href = '../pages/productDetails.html';
        displayMessage.innerHTML = 'Product Added';
        displayMessage.style.backgroundColor = '#defdef';
        setTimeout(function() {
            displayMessage.innerHTML = '';
        }, 4000);
    }
}

function addProductIntoDatabase(productData) {
    try {
        createDatabaseTableIfNotExists(createProductTable);
        executeDatabaseStatement(connection, insertProductTable, productData);
    } catch (error) {
        console.log(error.message);
        displayMessage.innerHTML = 'Product Added';
        displayMessage.style.backgroundColor = '#fddede';
        setTimeout(function() {
            displayMessage.innerHTML = '';
        }, 4000);
    }
}

function updateProduct() {
    const product = sessionStorage.getItem('productData');
    if (product !== null) {
        const productData = JSON.parse(product);
        const productValues = [
            selectProductName.value, 
            selectCategory.value, 
            selectSubCategory.value, 
            txtProductPrice.value, 
            txtProductStock.value,
            productData.pid
        ];
        try {
            const connection = openDatabase(databaseName, databaseVersion, databaseDescription, databaseSize);
            connection.transaction(function (query) {
                query.executeSql(updateProductTable, productValues, function (sqlTransaction, resultSet) {
                    console.log("product updated... ");
                    sessionStorage.removeItem('productData');
                    productForm.reset();
                    location.href = "../pages/productDetails.html";
                }, function(sqlTransaction, sqlError) {
                    console.log("SQL Error: ", sqlError);
                });
            });
        } catch (error) {
            console.log(error.message);
        }
        
    } else {
        alert('please select product ID from details page');
        console.log('please select product ID to update');
    }
}

function productDetails() {
    const product = sessionStorage.getItem('productData');
    if (product !== null) {
        console.log('edit product details');
        const productData = JSON.parse(product);
        selectCategory.value = productData.category;
        onChangeCategory();
        selectSubCategory.value = productData.sub;
        onChangeSubCategory();
        selectProductName.value = productData.name;
        txtProductPrice.value = productData.price;
        txtProductStock.value = productData.stock;
    } else {
        console.log('add product details');
    }
}
productDetails();
