import { useContext } from "react"
import { CartContext } from "../../components/Context/Cart/cart";
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import CartItem from "./CartItem";
import emptyCart from '../../assets/images/not-found.png'
import CallBtn from "../../components/CallBtn/CallBtn";
import { UserContext } from "../../components/Context/User/user";
import { toast } from "react-hot-toast";
import CustomToast from "../User/CustomToast/CustomToast";

const Cart = () => {

    const { cart } = useContext(CartContext);
    const subtotal = cart.reduce((acc, item) => acc += (item.price * item.quantity), 0)
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCheckOut = () => {
        if(user){
            if (user?.emailVerified){
                navigate("/check-out");
            }else{
                toast.custom( (t) => <CustomToast t={t} message={"You need to verify your account to complete the purcharse. A confirmation email has been sent to " + user.email} displayName={"Verify account"} />)
            }
        }else{
            toast.custom( (t) => <CustomToast t={t} message={"Please, sign up or sign in order to complete the purchase."} displayName={"Sign In"} />)
        }
    }

    if (cart && cart.length < 1) return (
        <main className="main-secondary-pages flex items-center justify-center flex-1 dark:bg-primary-inverted-hover flex-col bg-neutral-ultra-light">
            <img className="h-60 bg-red dark:invert" src={emptyCart} alt="Image of an empty cart" />
            <h3 className="text-primary-inverted dark:text-primary text-2xl font-body">No items in cart yet.</h3>
            <LinkRouter to="/products">
                <CallBtn className="py-0" word={"Shop>"} />
            </LinkRouter>
        </main>

    )

    return (
        <main className="main-secondary-pages items-center justify-center bg-neutral-lighter dark:bg-primary-inverted-hover">
            <div className="pb-10 pt-20">
                <div className=" justify-center px-6 md:flex md:space-x-6 xl:px-0">


                    <div className="rounded-lg md:w-2/3 ">

                        {cart && cart.map((cartItem) => {
                            return (
                                <CartItem key={cartItem._id} cartItem={cartItem} />
                            )
                        })}

                    </div>
                    {/* <!-- Sub total --> */}
                    <div className="mt-6 h-full rounded-lg border bg-primary dark:bg-primary-inverted p-6 shadow-md md:mt-0 md:w-1/3 dark:text-primary dark:border-primary-inverted-hover">
                        <div className="mb-2 flex justify-between">
                            <p className="text-primary-inverted dark:text-primary-hover">Subtotal</p>
                            <p className="text-primary-inverted dark:text-primary-hover">$ {subtotal.toFixed(2)}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">$ {subtotal.toFixed(2)} USD </p>
                            </div>
                        </div>
                        <span className="text-neutral">+ shipping charges</span>

                        <button
                            onClick={handleCheckOut}
                            className="mt-6 w-full rounded-md bg-key-color py-1.5 font-medium text-primary  hover:bg-key-color-hover">Check out</button>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart
