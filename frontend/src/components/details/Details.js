import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import Header from "../header/Header";
import UserLoginHeader from "../header/UserLoginHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../slices/ProductSlice";
import { addToCart } from "../../slices/CartSlice";

export function Details() {
    const products= useSelector(state => state.products.products)
    const isLoggedIn= useSelector(state => state.auth.user)
    const [selectedTenure, setSelectedTenure] = useState(3)
    const [selectedQuantity, setSelectedQuantity]= useState(1)
    const dispatch= useDispatch()
    const {catName, id}= useParams()

    useEffect( () => {
        dispatch(fetchProducts(catName))
    },[catName,dispatch])

    const product= products.find(product => product.id ==id)

    const handleTenureChange = (event) => {
        setSelectedTenure(event.target.value);
    };
    const handleQuantityChange= (event) => {
        setSelectedQuantity(event.target.value)
    }

    const handleAddToCart= () => {
        if(isLoggedIn){
            let index= 0
            for (let t = 0; t < product.rentaloptions.length; t++) {
                if(product.rentaloptions[t].tenure == selectedTenure){
                    index=t;
                }
            }
            const totalPerMonth = product.rentaloptions[index].ratepermonth;
            const totalPrice = totalPerMonth * selectedTenure;

            const selectedProduct= {
                ...product, 
                tenure: selectedTenure,
                totalPrice: totalPrice,
                selectedQuantity: selectedQuantity
            };
            dispatch(addToCart(selectedProduct))
        }else {
            alert("Please Login")
        }
    }

    return(
        <div>
            {isLoggedIn? <UserLoginHeader/> : <Header/>}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-1/2">
                        <img src={product.options.imageurl} alt={product.name} className="w-full h-auto" />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                        <p> {product.description}</p> <br></br>
                        <p> Sizes: {product.options.size}</p>
                        <p> Colors: {product.options.color}</p>
                        <p> 3 months: ₹{product.rentaloptions[0].ratepermonth}.0 per month</p>
                        <p> 6 months: ₹{product.rentaloptions[1].ratepermonth}.0 per month</p>
                        <p> 9 months: ₹{product.rentaloptions[2].ratepermonth}.0 per month</p>
                        <p> 12 months: ₹{product.rentaloptions[3].ratepermonth}.0 per month</p>
                        <p> Condition: {product.condition}</p>
                        <p> Delivered By: {product.noofdays} Day(s)</p> <br/>
                        <label htmlFor="tenure">Select Quantity: </label>
                        <input className="border border-gray-400 rounded w-10" value={selectedQuantity} onChange={handleQuantityChange} min={1} max={10} type='number'/> <br/>
                        <label htmlFor="tenure">Select Tenure: </label>
                        <select id="tenure" value={selectedTenure} onChange={handleTenureChange} className="border border-gray-400 rounded">
                            <option value={3}>3 months</option>
                            <option value={6}>6 months</option>
                            <option value={9}>9 months</option>
                            <option value={12}>12 months</option>   
                        </select>
                        <br/>
                        <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                    </div> 
                </div>
             </div>
        </div>
    )
}