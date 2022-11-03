// Bill Page Scripts
console.log('*** Bill Page Script ***');

const selectCategory = document.getElementById('selectCategory');
const spanProductCategory = document.getElementById('spanProductCategory');
const selectSubCategory = document.getElementById('selectSubCategory');
const spanProductSubCategory = document.getElementById('spanProductSubCategory');
const selectProductName = document.getElementById('selectProductName');
const spanProductName = document.getElementById('spanProductName');
const txtProductPrice = document.getElementById('txtProductPrice');
const spanProductPrice = document.getElementById('spanProductPrice');
const txtProductQuantity = document.getElementById('txtProductQuantity');
const spanProductQuantity = document.getElementById('spanProductQuantity');
const productForm = document.getElementById('productForm');
const displayMessage = document.getElementById('displayMessage');

function isValidPrice(event) {
    if (isLetters(event) == true) {
		spanProductPrice.innerHTML = "*";
	} else {
		spanProductPrice.innerHTML = "";
	}
}

function isValidQuantity(event) {
	if (isLetters(event) == true) {
		spanProductQuantity.innerHTML = "*";
	} else {
		spanProductQuantity.innerHTML = "";
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
    } else if (isEmpty(txtProductQuantity.value)) {
        spanProductQuantity.innerHTML = "*";
		spanProductQuantity.focus();
        return false;
    } else {
        return true;
    }
}

const productDetail = [];
function addProduct() {
    if (isFormEmpty() == true) {
        // getProductData();
        const productPrice = parseFloat(txtProductPrice.value);
        const productQuantity = parseInt(txtProductQuantity.value);
        const productTotalCost = productPrice * productQuantity;
        const productData = {
            name:selectProductName.value, 
            category:selectCategory.value, 
            sub:selectSubCategory.value, 
            quantity:productQuantity,
            price:productPrice,
            total:productTotalCost
        };
        productDetail.push(productData);
        productForm.reset();
        displayMessage.innerHTML = 'Product details added';
        displayMessage.style.backgroundColor = '#defdef';
        setTimeout(function() {
            displayMessage.innerHTML = '';
            console.log('productDetail: ' + JSON.stringify(productDetail));
        }, 4000);
    }
}

function generateBill() {
    if(productDetail.length > 0) {
        sessionStorage.setItem('productDetail', JSON.stringify(productDetail));
        location.href = '../pages/customer.html';    
    } else {
        console.log('productDetail is empty');
        displayMessage.innerHTML = 'Please add details first';
        displayMessage.style.backgroundColor = '#bedbed';
        setTimeout(function() {
            displayMessage.innerHTML = '';
        }, 4000);
    }
}
