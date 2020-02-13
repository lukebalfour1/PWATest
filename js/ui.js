const products = document.querySelector('.products');

//navbar slide code
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
});

//Render Product data
const renderProduct = (data, id) => {
  //Put html format for products in between ` `
  //Replace details with variables | ${data.Name} | ${data.Price} | ${data.Description}
  //Attach data-id="${id}" to div tag
  const html = `
  
  `;
  
  //Attaching html for the product into the html of the parent
  products.innerHTML += html;
};

//Remove Cart Products
//Get all remove buttons by their class name
var removeCartItemButtons = document.getElementsByClassName('')
//Console.log for testing
//console.log(removeCartItemButtons)
//For each remove button, create event listener
for (var i = 0; i < removeCartItemButtons.length; i++){
  var button = removeCartItemButtons[i]
  button.addEventListener('click', function(event){
    //console.log('clicked');
    var buttonCicked = event.target
    //remove parent of parent element when button is clicked
    buttonCicked.parentElement.parentElement.remove()
  })
}

//Update cart total when items are changed
function updateCartTotal(){
  //Get all cart items by class name
  var cartItemContainer = document.getElementsByClassName('')[0]
  //Filter elements in cartItemContainer by class name
  var cartRows = cartItemContainer.getElementsByClassName('')

  var total = 0
  for (var i = 0; i < cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('')[0]
    var quantityElement = cartRow.getElementsByClassName('')[0]

    var price = parseFloat(priceElement.innerText.replace('£', ''))
    var quantity = quantityElement.value

    //Console.log for testing
    //console.log(price * quantity)
    total = total + (price * quantity)
  }
  document.getElementsByClassName('')[0].innerText = '£' + total
   
}
