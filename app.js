// declare bunch of variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//cart item in an array

let cart = [];

// buttons
let buttonsDOM = [];

// for getting the products first locally then dynamically
class Products {
  async getProducts() {
    try {
      // use of async and await
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      // products is holding the array
      products = products.map((item) => {
        //all this .map method will itterate through the json and find the respective values
        // which are title , price , id , image
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products

// from aniket
class UI {
  displayProducts(products) {
    let result = "";
    // console.log(products);
    products.forEach((product) => {
      // template literals => (``)
      //Template literals are literals delimited with backtick ( ` ) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates
      result += `
        <article class="product">
        <div class="img-container">
          <img
            src=${product.image}
            alt="product"
            class="product-img"
          />
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to bag
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
        `;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.diable = true;
      }

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.diabled = true;
        // get products from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // add products to the cart
        cart = [...cart, cartItem];

        // save cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);

        // display cart items
        this.addCartItem(cartItem);
        // show the cart
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    // parsefloat=> parseFloat() picks the longest substring starting from the beginning that generates a valid number literal.
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src= ${item.image} alt="product"/>
        <div>
          <h4>${item.title}</h4>
          <h5>$${item.price}</h5>
          <span class="remove-item" data-id =${item.id}>remove</span>
        </div>
        <div>
          <i class="fas fa-chevron-up" data-id =${item.id}></i>
          <p class="item-amount">${item.amount}</p>
          <i class="fas fa-chevron-down" data-id =${item.id}></i>
        </div>`;

    cartContent.appendChild(div);
    
  }
  showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  setupAPP(){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click' ,this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart)
  }
  populateCart(cart){
    cart.forEach(item => this.addCartItem(item));
  }
  hideCart(){
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  cartLogic(){
    //clear cart button
    clearCartBtn.addEventListener('click', ()=>{
      this.clearCart();
    });
    //cart functionality
  }
  clearCart(){

    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    while(cartContent.children.length>0){
      
    }
  }
  removeItem(id){
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    // line 170 will help to locate the button which is used to add the item in the cart 
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML='<i class="fas fa-shopping-cart></i>add to cart';
  }

  getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id)
  }
}

//local storage

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    // use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. Parse the data with JSON.parse() , and the data becomes a JavaScript object.
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((products) => products.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart(){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]

  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
// setup application 
ui.setupAPP();
  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic()
    });
});

// async promise concept at 1:24:00 back some minutes


// at append child method line 131 