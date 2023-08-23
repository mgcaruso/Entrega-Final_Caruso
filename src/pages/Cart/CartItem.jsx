import { useState } from "react";
import ItemCount from "../../components/ItemCount/ItemCount";


const CartItem = ({ cartItem }) => {

    const [quantity, setQuantity] = useState(cartItem?.quantity);


    return (
        <div key={cartItem._id} className="justify-between mb-6 rounded-lg bg-primary dark:bg-primary-inverted dark:text-primary-hover p-6 shadow-md sm:flex sm:justify-start">
            <img src={cartItem?.image} alt={cartItem.name} className="w-full rounded-lg sm:w-40 object-cover" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between w-[9rem]">
                <div className="mt-5 sm:mt-0" >
                    <h2 className=" text-lg font-bold text-primary-inverted dark:text-primary ">{cartItem.name}</h2>
                    <p className="text-sm">{cartItem.brand}</p>
                    {/* <p className="text-sm">{}</p> */}
                    <p className="mt-1 text-xs text-primary-inverted-hover">$ {cartItem.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex flex-col items-center border-gray-100">

                        <ItemCount
                            quantity={quantity}
                            setQuantity={setQuantity}
                            cubeData={cartItem}
                            isItemInCart={true}
                            variant={{
                                name: cartItem.variantName,
                                image: cartItem.image
                            }}
                            itemInCart={cartItem} />
                    </div>

                    <div className="flex items-center space-x-4">

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartItem
