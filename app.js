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

let cart =[];

// for getting the products first locally then dynamically
class Products {
 async getProduct(){
    try{
        let result = await fetch('products.json')
    }catch (error){

    }
    

  }
}


// display products 
class UI {

}

//local storage

class Storage{


}

document.addEventListener("DOMContentLoaded" , ()=>{
const ui = new UI() 
const products = new Products();

})


// async promise concept at 1:24:00 back some minutes 