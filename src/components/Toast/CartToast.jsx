
import { toast } from "react-hot-toast";

const CartToast = ({ t, itemInCart, isItemInCart, from, variant }) => (
    <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-primary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-neutral-lighter dark:ring-primary-inverted ring-opacity-5 dark:bg-primary-inverted dark:text-primary`}
    >
        <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={variant?.image}
                        alt={variant?.name}
                    />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-primary-inverted dark:text-primary">
                        {itemInCart.name}
                    </p>
                    <p className="mt-1 text-sm text-primary-inverted-hover dark:text-primary-hover">
                    </p>
                    <p className="mt-1 text-sm text-primary-inverted-hover dark:text-primary-hover">

                        {
                            from === "add-update" ?
                                !isItemInCart
                                    ? `${itemInCart.quantity} ${itemInCart.quantity > 1 ? "items" : "item"} added successfully!`
                                    : `${itemInCart.quantity} ${itemInCart.quantity > 1 ? "items" : "item"} updated successfully!`
                                :

                                `${itemInCart.quantity} ${itemInCart.quantity > 1 ? "items" : "item"} removed from cart.`
                        }
                    </p>
                </div>
            </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-[#222]">
            <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-key-color hover:text-key-color focus:outline-none focus:ring-2 focus:ring-key-color"
            >
                Close
            </button>
        </div>
    </div>
);

export default CartToast;
