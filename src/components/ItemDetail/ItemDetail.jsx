import { Card } from 'flowbite-react';
import PriceItem from '../Item/PriceItem/PriceItem';
import IconVariant from '../IconVariant/IconVariant';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { useContext } from 'react';
import { CartContext } from '../Context/Cart/cart';

//---------------------IMPORTANTp ----------------------//
/*
LA VARIANTE INICIAL SELECCIONADA, EN EL CASO DE QUE EL ITEM ESTÉ EN EL CARRITO, 
TIENE QUE SER LA VARIANTE CUYO NOMBRE MATCHEE LA DEL CARRITO
*/
const ItemDetail = ({ item, cubeId }) => {

    const [variant, setVariant] = useState(null);
    const { cart } = useContext(CartContext);

    let isItemInCart = cart.some(cube => cube._id == item?._id);
    let itemInCart = cart.find(cube => cube._id == item?._id);
    const [quantity, setQuantity] = useState(itemInCart?.quantity || 1);

    useEffect(() => {
        if (item && cubeId) {
            const matchingVariant = item?.variants?.find(v => v.name === itemInCart?.variantName);
            setVariant(item && itemInCart ? matchingVariant : item.variants[0])
        }
    }, [cubeId, item])

    const handleVariantImage = v => {
        setVariant(v);
    };

    const customImageTheme = {
        img: {
            horizontal: {
                off: "rounded-t-lg",
                on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-[40%] md:rounded-none md:rounded-l-lg"
            }
        }
    };

    return (
        <main className="justify-center items-center font-body bg-neutral-lighter dark:bg-primary-inverted-hover">
            {
                item &&

                <Card
                    horizontal
                    theme={customImageTheme}
                    imgAlt={variant && item?.name}
                    imgSrc={variant && variant.image}
                    className='max-w-xl md:max-w-[80%] bg-primary dark:bg-primary-inverted'
                >
                    <h5 className="text-2xl font-bold tracking-tight text-primary-inverted dark:text-primary">
                        {item?.name}
                    </h5>
                    <div className="price-variants flex justify-between">
                        <PriceItem cube={item} />
                        <p className="font-normal text-primary-inverted-hover dark:text-neutral-light dark:text-neutral-lighter">
                            <span className='font-bold text-primary dark:font-normal'>Category:</span> {item?.category}
                        </p>
                    </div>
                    <p className="font-normal text-primary-inverted-hover dark:text-neutral-light text-justify dark:text-neutral-lighter">
                        {item?.description}
                    </p>

                    <div className="variants-box">
                        <p className='text-primary-inverted py-2'>Select a variant:</p>
                        <div className="variants flex gap-3">
                            {!variant ?

                                <Spinner />
                                :

                                item?.variants?.map((v, i) =>
                                    <button className={v.name === variant.name ? "ring-2 ring-neutral rounded-md" : "hover:ring-2 hover:ring-neutral-lighter rounded-md hover:shadow-md shadow-sm"} onClick={() => handleVariantImage(v)} key={i}>
                                        <IconVariant variant={v.name} />
                                    </button>
                                )
                            }

                        </div>
                    </div>
                    <section className="purchase-section flex flex-wrap w-full  md:w-[60%] sm:w-[60%]">
                        <ItemCount
                            quantity={quantity}
                            setQuantity={setQuantity}
                            cubeData={item}
                            variant={variant}
                            isItemInCart={isItemInCart}
                            itemInCart={itemInCart} />
                    </section>

                </Card>
            }
        </main>
    )
}

export default ItemDetail
