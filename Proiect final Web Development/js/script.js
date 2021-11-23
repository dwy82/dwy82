const PRODUCTS = [
    {
        pret: 50,
        nume: 'Pizza Margherita',
        id: 1,
        stoc: 20,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'pizza cu cascaval',
        count: 0,
        image: 'margherita.jpg',
    },
    {
        pret: 50,
        nume: 'Pizza Polo',
        id: 2,
        stoc: 20,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'pizza cu pui',
        count: 0,
        image: 'polo.jpg',
    },
    {
        pret: 50,
        nume: 'Pizza Tono',
        id: 3,
        stoc: 0,
        reviews: [],
        discount: true,
        percentageOfDiscount: 20,
        descriere: 'pizza cu ton',
        count: 0,
        image: 'tono.jpg',
    },
   
]


const SECTION_PRODUCTS_ELEM = document.getElementById('sectionProducts');
const SECTION_CART_ELEM = document.getElementById('shoppingCart');
const SHOPPING_CART_BUTTON_ELEM = document.getElementById('shoppingCartButton');
const TOTAL_PRICE_ELEM = document.getElementById('costTotal');
const shoppingCartList = document.getElementById('shoppingCartList');
const HOME_PAGE_LOGO = document.getElementById('logo');
const ALERT_TEXT = 'Ai adaugat un produs cu succes !';
const ALERT_TEXT_STOC = "Nu este pe stoc";
const REMOVE_CART = document.getElementById('remove');
const COUNTER = document.getElementById('counter');


if(sessionStorage.getItem('counter')) {
    COUNTER.innerHTML = sessionStorage.getItem('counter'); 
}

function addCounter() {
    COUNTER.innerHTML = shoppingCart.length + 1;
}
function removeCounterItem() {
    COUNTER.innerHTML = shoppingCart.length;
}


function homePage() {
    HOME_PAGE_LOGO.addEventListener('click', function (ev) {
        SECTION_CART_ELEM.classList = 'hidden';
        SECTION_PRODUCTS_ELEM.classList = 'row';
        shoppingCart.forEach(function(product) {
            $('#' + product.id).remove();
        })
    });
}
homePage();

function addToShoppingCart(id) {
    PRODUCTS.forEach(function (product) {
       
        if (product.id === id) {
            if (product.stoc > 0) {
                addCounter();
                shoppingCart.push(product);
                sessionStorage.setItem('counter', shoppingCart.length);
                product.stoc--;
                alert("Pe stoc sunt: " + product.stoc + " produse " + ALERT_TEXT);
            }
            else {
                alert(ALERT_TEXT_STOC);
            }

        }


    });
    sessionStorage.setItem('shopingCart', JSON.stringify(shoppingCart));
}

function generateItem(products) {
    const sectionProducts = document.getElementById('sectionProducts');
    products.forEach(function (product) {
        $('#sectionProducts').append(
            '<div class="col-md-3 col-xs-12">' +
            '<div class="card">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + product.nume + '</h5>' +
            '<p class="card-text">' + product.descriere + '</p>' +
            '<button onclick="addToShoppingCart(' + product.id + ')' + '" class="btn btn-primary">Adauga in cos</a>' +
            '</div>' +
            '</div>' 
        )
    });
}

function generateShoppingCartList() {
    if(sessionStorage.getItem('shopingCart')) {
        shoppingCart = JSON.parse(sessionStorage.getItem('shopingCart'));
        console.log(shoppingCart);
    }
    shoppingCart.forEach(function (product) {
        $('#shoppingCartList').append('<li id="'+ product.id + '"><p>Denumire produs:' + product.nume + ', Descriere produs:' + product.descriere + 'lorem <button class="btn btn-danger" onclick="removeShoppingCartItem(' + product.id +')" id="remove">-</button></p></li>')
       
    })
    calculatePrice();
}

function removeShoppingCartItem(id) {
   
    $('#' + id).remove();
    
    shoppingCart.forEach(function(product, index) {
        if(product.id === id) {
            shoppingCart.splice(index, 1);
        }
    });
   
    TOTAL_PRICE_ELEM.innerHTML = calculatePrice();
   
    PRODUCTS.forEach(function(product) {
        if(product.id === id) {
            product.stoc += 1;
        }
    });
   
    removeCounterItem();
    sessionStorage.setItem('counter', shoppingCart.length);
}



generateItem(PRODUCTS);

function calculatePrice() {
    let price = 0;
    shoppingCart.forEach(function (produs) {
        price += produs.pret;


    })
    return price;
}

let shoppingCart = [];

SHOPPING_CART_BUTTON_ELEM.addEventListener('click', function (ev) {

    SECTION_PRODUCTS_ELEM.classList = 'hidden';
    SECTION_CART_ELEM.classList = '';
    TOTAL_PRICE_ELEM.innerHTML = calculatePrice();
    generateShoppingCartList();

});


