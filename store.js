if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeBtn = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeBtn.length; i++) {
        var button = removeBtn[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);

    var addToCartButton = document.getElementsByClassName('shop-item-btn');
    for (i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i];
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click',  purchaseClicked);
}

function purchaseClicked(){
     alert('Thank you for your purchase');
     var cartItems = document.getElementsByClassName('cart-items')[0]
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild);
     }
     updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSource = shopItem.getElementsByClassName('shop-item-img')[0].src;
    console.log(title, price, imgSource);
    addItemToCart(title, price, imgSource);
    updateCartTotal();
}

function addItemToCart(title, price, imgSource) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItem.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Product is already added to cart');
            return;
        }
    }
    
    var cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-img" src="${imgSource}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger cart-quantity-button" type="button">REMOVE</button>
    </div> `
    cartRow.innerHTML = cartRowContent; 
    cartItem.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}




function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value)) {
        input.value = 1;
    }
    updateCartTotal();
}




function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    if (cartRows.length == null) {
        totalPrice.innerText = "€" + 0;
    }
    for (i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('€', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity); 
        }
        total = Math.round(total * 100) / 100;
        ;
        console.log(document.getElementsByClassName('cart-total-price')[0].innerText = "€" + total)
        }