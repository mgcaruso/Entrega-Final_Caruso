import { BiCartAdd } from "react-icons/bi";
import { HiArrowPath, HiTrash } from 'react-icons/hi2'
import { useState } from "react";
import { useEffect } from "react";

const CustomBtn = ({ cubeData, handleAddToCart, isItemInCart, itemInCart, quantity, variant }) => {

    const [btnStatus, setBtnStatus] = useState();


    const [variantMatch, setVariantMatch] = useState(false);


    const addBtnClasses = {
        disabledClass: "rounded-md border-2 border-neutral-lighter p-1 text-neutral w-full dark:border-[#333] dark:text-[#333]"
    }


    const { disabledClass } = addBtnClasses;

    const shadow = {
        strong: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        light: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    };

    const generateBtnClass = (type) => {
        let baseClass = "rounded-md border-2 p-1 ease-in duration-200 w-full ";
        switch (type) {
            case ("update"):
                return baseClass + "border-2 border-key-color dark:border-key-color text-key-color dark:text-key-color hover:text-primary hover:bg-key-color dark:hover:bg-key-color dark:hover:text-primary"
            case ("add"):
                return baseClass + "border-2 border-primary-inverted dark:border-neutral-lighter text-primary-inverted dark:text-primary hover:text-primary hover:bg-primary-inverted dark:hover:bg-primary dark:hover:text-primary-inverted"
            case ("added"):
                return baseClass + "border-2 border-green-500 dark:border-green-500 text-green-500 dark:text-green-500"
            case ("remove"):
                return baseClass + "border-2 border-red-800 dark:border-red-800 text-red-800 dark:text-red-800"
            default:
                return;
        }
    }


    useEffect(() => {
        conditions();
        if (itemInCart && variant) {
            if (variant?.name === itemInCart.variantName) {
                setVariantMatch(true)

            } else {
                setVariantMatch(false)
            }
        }
    }, [itemInCart, isItemInCart, quantity, variant])

    const conditions = () => {
        if (!isItemInCart) {
            setBtnStatus("add"); //EL ITEM NO ESTA EN EL CART
        } else {
            //EL ITEM ESTA EN EL CART
            setBtnStatus("update");
        }

    }

    let actualClass = generateBtnClass(btnStatus);



    return (
        <button
            disabled={cubeData.stock < 1 ? true : false}
            onClick={handleAddToCart} style={{
                boxShadow: shadow.light,
            }} className={cubeData.stock < 1 ? disabledClass : actualClass}>
            {
                isItemInCart ?
                    <div className="flex justify-center items-center">
                        {
                            (quantity != itemInCart.quantity) || !variantMatch ?
                                <>
                                    <HiArrowPath size={20} />
                                    <span className="px-2">
                                        Update
                                    </span>
                                </>
                                :
                                <>
                                    <HiTrash size={20} />
                                    <span className="px-2">
                                        Remove
                                    </span>
                                </>

                        }

                    </div>
                    :
                    <div className="flex justify-center items-center">
                        <BiCartAdd size={20} />
                        <span className="px-2">
                            Add to Cart
                        </span>
                    </div>
            }
        </button>
    )
}

export default CustomBtn
