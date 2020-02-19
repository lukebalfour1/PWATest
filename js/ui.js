const products = document.querySelector('.products');
const customers = document.querySelector('.customers');

//navbar slide code
document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'left' });
});

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
};

//adding products to the ui using the database
const renderProduct = (data, id) => {
  const html =
    `<div class="card-col" data-id="${id}">
      <div class="card">
        <div class="card-image">
          <img class="product-image" src="${data.img}">
          <span class="card-title">${data.name}</span>
        </div>
        <div class="card-content">
          <p class="card-p">${data.description}</p>
          <p class="card-price right">Price: £<span class="product-price">${data.price}</span></p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn grey lighten-2 shop-item-button"><i class="material-icons left">local_grocery_store</i>Add To Cart</a>
        </div>
      </div>
    </div>`;

  //Attaching html for the product into the html of the parent
  products.innerHTML += html;
};

function ready() {
  //Remove Cart Products
  //Get all remove buttons by their class name
  var removeCartItemButtons = document.getElementsByClassName('btn-remove')
  //Console.log for testing
  //console.log(removeCartItemButtons)
  //For each remove button, create event listener
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  //make quantity changes update total price
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  //add items to cart
  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

};

function purchaseClicked() {
  var finalCartItems = document.getElementsByClassName('cart-items')[0].innerHTML
  //console.log(finalCartItems[0].innerHTML)
  sessionStorage.setItem("cartcontent", finalCartItems)
  console.log(sessionStorage.getItem("cartcontent"))
};

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('card-title')[0].innerText
  var price = shopItem.getElementsByClassName('product-price')[0].innerText
  var imgSrc = shopItem.getElementsByClassName('product-image')[0].src
  console.log(title, price, imgSrc)
  addItemToCart(title, price, imgSrc)
  updateCartTotal()

};

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(var i = 0; i < cartItemNames.length; i++) {
    if(cartItemNames[i].innerText == title) {
      alert('This item is already in the cart')
      return
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">£${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
     <button class="btn-remove" type="button">REMOVE</button>
    </div>
  `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

};

function removeCartItem(event) {
  var buttonCicked = event.target
  //remove parent of parent element when button is clicked
  buttonCicked.parentElement.parentElement.remove()
  updateCartTotal()
};

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
};

//Remove Cart Products
//Get all remove buttons by their class name
var removeCartItemButtons = document.getElementsByClassName('btn-remove')
//Console.log for testing
//console.log(removeCartItemButtons)
//For each remove button, create event listener
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i]
  button.addEventListener('click', function (event) {
    //console.log('clicked');
    var buttonCicked = event.target
    //remove parent of parent element when button is clicked
    buttonCicked.parentElement.parentElement.remove()
    updateCartTotal()
  })
};

//Update cart total when items are changed
function updateCartTotal() {
  //Get all cart items by class name
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  //Filter elements in cartItemContainer by class name
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')

  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

    var price = parseFloat(priceElement.innerText.replace('£', ''))
    var quantity = quantityElement.value

    //Console.log for testing
    //console.log(price * quantity)
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total

};
