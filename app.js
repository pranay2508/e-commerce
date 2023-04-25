// declare bunch of variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".product-center");

//cart item in an array

let cart = [];

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
class UI {
    displayProducts(products){
        console.log(products);

    }
}

//local storage

class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then( products => ui.displayProducts(products))
});

// async promise concept at 1:24:00 back some minutes




// starrt from 1:40:15 