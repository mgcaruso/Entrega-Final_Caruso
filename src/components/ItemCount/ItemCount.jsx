import { CartContext } from "../Context/Cart/cart";
import { useContext, useState } from "react";
import CustomBtn from "./CustomBtn/CustomBtn";
import { toast } from "react-hot-toast";
import CartToast from "../Toast/CartToast";
import { useEffect } from "react";


const ItemCount = ({ cubeData, variant, isItemInCart, itemInCart, quantity, setQuantity }) => {

    const { cart, setCart } = useContext(CartContext);

    const itemCountClasses = {
        itemDisabledClass: "font-bold flex-grow text-neutral dark:text-[#333]",
        itemEnabledClass: "font-bold flex-grow hover:bg-neutral-lighter hover:text-primary-inverted dark:hover:bg-primary-inverted-hover dark:hover:text-primary ease-in duration-100",
    }

    const { itemDisabledClass, itemEnabledClass } = itemCountClasses;



    const handleAddQty = () => {
        if (quantity < cubeData.stock) {
            setQuantity(quantity + 1);
        }
    }

    const handleRemoveQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleAddOrUpdate = () => {
        
        const { _id, name, brand, description, category, price, stock } = cubeData;
        const itemInCart = {
            _id: _id,
            name: name,
            brand: brand,
            price: price,
            description: description,
            category: category,
            quantity: quantity,
            stock: stock,
            image: variant?.image,
            variantName: variant?.name
        }

        if (cart.length !== 0) {

            const updatedCart = cart.map(item => {
                if (item._id === itemInCart._id) {
                    return {
                        ...item,
                        quantity: itemInCart.quantity,
                        image: variant?.image,
                        variantName: variant?.name
                    };
                }
                return item;
            });
            let isItemInCart = cart.some(item => item._id == itemInCart._id);

            if (!isItemInCart) { //si el item no esta
                setCart((pS) => [...pS, itemInCart]);
            
                localStorage.setItem("cart", JSON.stringify([...cart, itemInCart]));

            } else { //si el item ya está , actualizo la cantidad
                setCart(updatedCart);

                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }
        } else {
            setCart([itemInCart]);

            localStorage.setItem("cart", JSON.stringify([itemInCart]));
        }

        toast.custom((t) => (
            <CartToast t={t} variant={variant} itemInCart={itemInCart} isItemInCart={isItemInCart} from="add-update" />
        ));
    }

    const handleRemoveFromCart = () => {
        let cartFiltered = cart.filter(cube => cube._id !== itemInCart._id);
        setCart(cartFiltered)

        localStorage.setItem("cart", JSON.stringify(cartFiltered));
        
        toast.custom((t) => (
            <CartToast variant={variant} t={t} itemInCart={itemInCart} isItemInCart={isItemInCart} from="remove" />
        ));
    }

    const [variantsEqual, setVariantsEqual] = useState(false);
    useEffect(() => {
    
        if (itemInCart && variant) {
            if (variant?.name === itemInCart.variantName) {
                setVariantsEqual(true)

            } else {
                setVariantsEqual(false)
            }
        }
    }, [itemInCart, isItemInCart, quantity, variant])

    return (
        <div className="min-w-[10rem] flex flex-col gap-2">
            <div className="btn-box flex w-full justify-around border-neutral-lighter border-[#ececec] dark:border-[#333] border-t-[1px] border-b-[1px] bg-primary-hover dark:bg-primary-inverted">
                <button
                    disabled={cubeData.stock < 1 ? true : false}
                    onClick={handleRemoveQty}
                    className={cubeData.stock < 1 ? itemDisabledClass : itemEnabledClass}
                >-</button>

                <div className="quantity flex-grow flex items-center justify-center py-1 dark:text-neutral ">
                    {
                        cubeData.stock < 1 ? 0
                            :
                            quantity
                    }</div>

                <button
                    disabled={cubeData.stock < 1 ? true : false}
                    onClick={handleAddQty}
                    className={cubeData.stock < 1 ? itemDisabledClass : itemEnabledClass}
                >+</button>
            </div>
            <CustomBtn

                variant={variant}
                cubeData={cubeData}
                handleAddToCart={isItemInCart && ((itemInCart.quantity === quantity) && variantsEqual) ? handleRemoveFromCart : handleAddOrUpdate}
                isItemInCart={isItemInCart}
                itemInCart={itemInCart}
                quantity={quantity}
            />
        </div>
    )
}

export default ItemCount
