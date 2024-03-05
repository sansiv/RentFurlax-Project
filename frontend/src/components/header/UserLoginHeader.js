import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slices/AuthSlice";
import { resetCart } from "../../slices/CartSlice";

export default function Header() {
    const items= useSelector(state => state.cart.items)
    const cartNo= items.length    // no.of items on cart
    const dispatch= useDispatch()
    const logoutHandler= () =>{
        dispatch(logoutUser())
        dispatch(resetCart())
    }

    return(
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://i.ibb.co/Nr749J2/Rent-Furlax.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/dashboard"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/orders"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Orders
                        </Link>
                        <Link
                            to="/checkout"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Checkout ({cartNo})
                        </Link>
                        <Link
                            to=""
                            onClick={logoutHandler}
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )

}