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

// for getting the products first locally then dynamically
class Products {
  async getProducts() {
    try {
      // use of async and await
      let result = await fetch("products.json")
      let data = await result.json();
      let products = data.items;
      // products is holding the array
      products = products.map((item) => {
        //all this .map method will itterate through the json and find the respective values
        // which are title , price , id , image
        const {title, price} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        return {title, price, id, image};
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
    displayProducts(products){
        let result = '';
        // console.log(products);
       products.forEach(product => {
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
    getBagButtons(){ 
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button =>{
            let id = button.dataset.id;
            console.log(id);
        })

    }
}

//local storage

class Storage {
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products)
        );
    }

}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(()=>{
    ui.getBagButtons();
  });
});






































































































// async promise concept at 1:24:00 back some minutes




