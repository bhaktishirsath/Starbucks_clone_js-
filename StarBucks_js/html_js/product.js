//Bistro Reccommends

let selectelement=document.querySelector(".elements");
let cartitemsel=document.querySelector(".offcanvas-body");
let subtotalel=document.querySelector(".subtotal");
let itemsincartel=document.querySelector(".btn-light span");

const Bistro=[
  {
  id:1,
  name:"Iced White Mocha",
  price:210,
  qty:0,
  
},
{
  id:2,
  name:"Cafe Americano",
  price:250,
  qty:0,
},
{
  id:3,
  name:"Iced Cafe Latte",
  price:200,
  qty:0,
},
{
  id:4,
  name:"Caramel Macchiato",
  price:225,
  qty:0,
},
{
  id:5,
  name:"Caramel Macchiato",
  price:305,
  qty:0,
},
{
  id:6,
  name:"Cafe Mocha",
  price:200,
  qty:0,
},
{
  id:7,
  name:"Coffee with Cream",
  price:277,
  qty:0,
},
{
  id:8,
  name:"Pumkin Spice Latte",
  price:267,
  qty:0,
},
{
  id:9,
  name:"Cold Coffee",
  price:2180,
  qty:0,
},
{
  id:10,
  name:"Saffron Pistachio Latte",
  price:330,
  qty:0,
},

]

function displaycoffee(){
  Bistro.forEach((products)=>{
    selectelement.innerHTML +=
   `  <div class="col-md-4 col-lg-3 d-flex d-flex-wrap position-relative bistro "  style="background-color: white; border-radius:20px ;padding:9px;">
      <div class="row">
        <div class="col img">
           <img src="/images/${products.id}.jpg" alt="" height="100px" width="140px" style="border-radius: 20px;" >
        </div>
        <div class="col img2">
          <img src="/images/veg.jpg" alt="" height="20px" width="20px"  >
          <a href="/index.html"><h1 style="font-size:15px;">${products.name}</h1></a>
          <p class="text-muted">SHORT()</p>
       </div>
       <div class="d-flex align-content-between gap-2 bistro2"  style="font-size:bold;">
        <p
        h1>Rs.${products.price}</h1><p class="text-muted flex-grow-0 gap-0"><sub>.25</sub></p> 
        <button type="button" class="btn btn-sm btn-success" 
        onclick="addtocart(${products.id})">+ Add</button>        
      </div>
      </div>
      </div>
`
  })
}
displaycoffee();
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updatecart();

// Add item to cart
function addtocart(id) {
  // Check if the product is already in the cart
  if (cart.some((item) => item.id === id)) 
    {
    changeqty("plus", id); 
  } else {
    const item = Bistro.find((product) => product.id === id);
    cart.push({ ...item, qty: 1 }); 
  }
  updatecart(); 
}

// Update cart
function updatecart() {
  rendercartitems();
  rendersubtotal();
  localStorage.setItem("CART", JSON.stringify(cart)); // Save cart state
}

// Render cart items
function rendercartitems() {
  cartitemsel.innerHTML = ""; // Clear cart content
  cart.forEach((item) => {
    cartitemsel.innerHTML += `
      <div class="cart-item ">
        <div class="d-flex gap-2">
        <img src="/images/${item.id}.jpg" height="60" width="60" style="border-radius:20px;">
        <h2 style="color:green">${item.name}</h2>
        </div>
        <div class="d-flex gap-5">
        <div><h5>Rs.${item.price}</h5></div>
        <div>
        <button onclick="changeqty('minus', ${item.id})" style="border:none">-</button>
        ${item.qty}
        <button onclick="changeqty('plus', ${item.id})" style="border:none">+</button>
        <button onclick="removeitem(${item.id})" style="border:none">Remove</button></div>
        <br></div>

      </div>
      <hr>
      <br>`;
  });
}

// Change item quantity
function changeqty(action, id) {
  cart = cart.map((item) => {
    let qty = item.qty;
    if (item.id === id) {
      if (action === "minus" && qty > 1) qty--; // Decrease qty
      else if (action === "plus") qty++; // Increase qty
    }
    return { ...item, qty };
  });
  updatecart(); // Update cart display and storage
}

// Calculate and display subtotal
function rendersubtotal() {
  let totalprice = 0,
    totalitems = 0;
  cart.forEach((item) => {
    totalprice += item.price * item.qty;
    totalitems += item.qty;
  });
  subtotalel.innerHTML = `Subtotal(${totalitems} items): Rs.${totalprice.toFixed(2)}`;
  itemsincartel.innerHTML = totalitems;
}

// Remove item from cart
function removeitem(id) {
  cart = cart.filter((item) => item.id !== id); // Remove item
  updatecart(); // Update cart display and storage
}

























// =========================
// var cart=[];
// function addtocart(id){
//   cart.push({...categories[id]})
// }


// function displaycart(id){
//   let j=0;
// document.getElementById('qty').inert.cart.length;
//   if(cart.length==0){
//     document.getElementById('cartItem').innerHTML="Your Cart is empty!";
//     document.getElementById('total').innerHTML="Rs"+ 0 +".00";

//   }
//   else{
//         document.getElementById('cartItem').innerHTML=cart.map((items)=>{
//           var{id,name,price,qty}=items;
//           total=total+price;
//           document.getElementById("total").innerHTML="Rs"+total+".00";
//           return(
//            `<table class="table w-100">
//             <tbody>
//               <tr><td><img src="images/${items.id}.jpg" height=50 width=50></td>
//               <td><p style="font-size:13px;">${items.name}</p></td>
//               <td>$${items.price}</td>
//               <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
//               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//               <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
//             </svg> ${items.qty} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
//               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
//             </svg></td>
//               <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${items.id})"></i></td>
//             </tr></tbody></table>`
              
//         )

//         })
//   }
// }