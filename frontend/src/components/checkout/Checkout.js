import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserLoginHeader from "../header/UserLoginHeader";
import { removeFromCart, resetCart, updateCartItemQuantity } from "../../slices/CartSlice";
import { useEffect, useState } from "react";

export function Checkout() {
  const userName= useSelector(state => state.auth.username)  
  const cartItems = useSelector((state) => state.cart.items);
  const cartNo= cartItems.length   // no.of items in cart
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };
// To re-render the page when user tries to update his/her cart
  useEffect( () => {},[cartItems])

  const handleQuantityChange = (event, item) => {
    const newQuantity = event.target.value;
    dispatch(updateCartItemQuantity(item.id, newQuantity));
  };

  const genrateInvoice= async () => {
    const username= userName
    const productIds= cartItems.map(item => item.id)
    const status= "ORDERED" // Default status while placing a order
    const totalAmount= cartItems.reduce((total, item) => total+item.totalPrice,0)

    const productsList = cartItems.map(item => ({
        product_name: item.name,
        quantity: item.selectedQuantity,
        price: item.totalPrice
    }))

    try{
        const response= await fetch('http://127.0.0.1:8000/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                products: productIds,
                products_details: productsList,
                status,
                total_amount: totalAmount
            })
        })
        if (response.ok){
            const data= await response.json()
            console.log('Invoice generated successfully:', data);
            dispatch(resetCart())
        } else{
            console.error('Failed to generate invoice:', response.statusText);
        }
    } catch(error){
        console.error('Error generating invoice:', error);
    }
  }

  return (
    <div>
      <UserLoginHeader/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-2xl font-semibold mb-4"> Place Your Order</h1>
        {cartNo==0? <h2 className="text-center text-2xl font-semibold mb-4">No Items Added To Cart!</h2> : <span></span> }
        <div className="grid grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg">
              <img
                src={item.options.imageurl}
                alt={item.name}
                className="w-full h-auto mb-2"
              />
              <p className="font-semibold">{item.name }</p>
              {/* <p>Quantity: {item.selectedQuantity} unit(s) </p> */}
              <p>
                Quantity:&nbsp;
                <input
                  type="number"
                  className="border border-gray-400 rounded w-10"
                  value={item.selectedQuantity}
                  min={1}
                  max={10}
                  onChange={(event) => handleQuantityChange(event, item)}
                />
                unit(s)
              </p>

              <p>Tenure: {item.tenure} months</p>
              <p>Total Price: ₹{item.totalPrice * item.selectedQuantity}.0 </p>
              {/* <p>Price: ₹{item.rentaloptions[0].ratepermonth}.0 per month</p> */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRemoveFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        { cartNo!==0?
        <Link to='/orders'>
        <button onClick={genrateInvoice} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
          Proceed to Checkout
        </button>
        </Link>
        : <span/> }
      </div>
    </div>
  );
}
