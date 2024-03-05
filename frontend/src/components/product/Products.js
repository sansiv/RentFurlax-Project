import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import UserLoginHeader from "../header/UserLoginHeader";
import { useEffect } from "react";
import { fetchProducts } from "../../slices/ProductSlice";
import { Link, useParams } from "react-router-dom";

export default function Products() {
    const products= useSelector(state => state.products.products)
    const isLoggedIn= useSelector(state => state.auth.user)
    const dispatch= useDispatch()
    const params= useParams()
    const categoryName= params['categoryName']
    //console.log(params['categoryName'])

    useEffect( ()=> {
        dispatch(fetchProducts(categoryName))
    },[categoryName,dispatch])

    return(
        <div>
            {isLoggedIn? <UserLoginHeader/> : <Header/>}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center text-2xl font-semibold mb-4">Products Under {categoryName}</h1>
                 <div className="grid grid-cols-3 gap-4">
                     {products.map( (product) => (
                     <div key={product.id} className="bg-gray-100 p-4 rounded-lg">
                        <img src={product.options.imageurl} alt={product.name} className="w-full h-auto mb-2" />
                        <p className="font-semibold">{product.name}</p>
                        {/* <p> p>{product.description}</p>
                        <p> Sizes: {product.options.size}</p>
                        <> Colors: {product.options.color}</ */}
                        <p> 3 months <br></br>₹{product.rentaloptions[0].ratepermonth}.0 per month</p>
                        {/* <p> 6 months: {product.rentaloptions[1].ratepermonth}</p>
                        <p> 9 months: {product.rentaloptions[2].ratepermonth}</p>
                        <p> 12 months: {product.rentaloptions[3].ratepermonth}</p>
                        <p> Condition: {product.condition}</p>
                        <p> Delivered By: {product.noofdays} Day(s)</p> */}
                        <Link to={`/details/${categoryName}/${product.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Details</button>
                        </Link>
                    </div>
                     ))}
                 </div>
            </div>
        </div>


    )
}