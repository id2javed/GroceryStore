// custom JS for index page ...

let mainMenu = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
mainMenu = mainMenu + '<div class="container-fluid">';
mainMenu = mainMenu + '<a href="index.html" class="navbar-brand">';
mainMenu = mainMenu + '<h1>Grocery Store</h1>';
mainMenu = mainMenu + '</a>';
mainMenu = mainMenu + '<button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">';
mainMenu = mainMenu + '<span class="navbar-toggler-icon"></span>';
mainMenu = mainMenu + '</button>';
mainMenu = mainMenu + '<div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">';
mainMenu = mainMenu + '<div class="navbar-nav">';

const user = sessionStorage.getItem('userData');
if (user != null) {
    const userData = JSON.parse(user);
    if (userData.role == 'admin') {
        mainMenu = mainMenu + '<a href="home.html" class="nav-item nav-link active">Home</a>';
        mainMenu = mainMenu + '<a href="addProduct.html" class="nav-item nav-link">Products</a>';
        mainMenu = mainMenu + '<a href="productDetails.html" class="nav-item nav-link">Details</a>';
        mainMenu = mainMenu + '<a href="invoice.html" class="nav-item nav-link">Invoice</a>';
    } else if (userData.role == 'user') {
        mainMenu = mainMenu + '<a href="home.html" class="nav-item nav-link active">Home</a>';
        mainMenu = mainMenu + '<a href="billing.html" class="nav-item nav-link">Billing</a>';
        mainMenu = mainMenu + '<a href="customer.html" class="nav-item nav-link">Customer</a>';
    }
} else {
    mainMenu = mainMenu + '<a href="index.html" class="nav-item nav-link active">Home</a>';
    mainMenu = mainMenu + '<a href="login.html" class="nav-item nav-link">Login</a>';
}
mainMenu = mainMenu + '<a href="logout.html" class="nav-item nav-link">Logout</a>';
mainMenu = mainMenu + '</div>';
mainMenu = mainMenu + '</div>';
mainMenu = mainMenu + '</div>';
mainMenu = mainMenu + '</nav>';
document.getElementById('mainMenu').innerHTML = mainMenu;
