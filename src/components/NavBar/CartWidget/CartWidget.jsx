import { FiShoppingCart } from "react-icons/fi";


const CartWidget = ({ quantity }) => {


    return (
        <div id="cart-box" className="mr-1 inset-y-0 right-10 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
            <button
                id="cart-btn"
                type="button"
                className="group p-2 text-primary-inverted dark:text-primary focus:outline-none  relative"
            >
                <span className="sr-only">View notifications</span>

                {
                    quantity > 0 &&
                    <span
                        id="cart-number"
                        className="absolute bg-key-color-hover text-primary h-5 w-5 flex justify-center items-center rounded-full text-xs drop-shadow-md left-6 bottom-5 group-hover:bg-key-color " >{quantity}</span>
                }
                <FiShoppingCart id="cart-icon" className="h-6 w-6 group-hover:text-neutral" aria-hidden="true" />

            </button>
        </div>
    )
}
export default CartWidget;


{/* <button
                id="cart-btn"
                type="button"
                className="p-2 text-primary-inverted hover:text-neutral focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 relative"
            ></button> */}