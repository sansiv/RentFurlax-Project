import { useDispatch, useSelector } from "react-redux";
import UserLoginHeader from "../header/UserLoginHeader";
import { useEffect} from "react";
import { fetchInvoices } from "../../slices/InvoiceSlice";


export function Orders(){
    const currentUser= useSelector(state => state.auth.username)
    const allInvoices= useSelector(state=> state.invoices.invoices)
    const dispatch= useDispatch()

    useEffect( ()=>{
        dispatch(fetchInvoices())
    },[dispatch])

    const invoices= allInvoices.filter(invoice=> invoice.username === currentUser)
    invoices.reverse()

    console.log(invoices)

    return(
        <div>
            <UserLoginHeader/>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center text-2xl font-semibold mb-4">Your Orders</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {invoices.map((invoice) => (
                    <div key={invoice.id} className="border-2 border-black bg-slate-100 rounded-lg p-4 relative">
                        <p className="text-center mb-3 text-lg font-semibold">Invoice Number: {invoice.id}</p>
                        {invoice.products_details.map((item) => (
                            <div key={item.product_name} className="border border-black rounded p-2 mt-4">
                                <p>Product Name: {item.product_name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        ))}   
                        <p className="mt-3">Date Ordered: {new Date(invoice.generated_on).toLocaleDateString()}</p>
                        <p>Status: {invoice.status}</p>
                        <p>Booked By: {invoice.username}</p>
                        <p> Total Bill Amount: {invoice.total_amount} </p>
                        <p className="absolute bottom-0 right-0 text-xs mt-2 mr-2">Fulfilled by RENTFURLAX®</p> 
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}
