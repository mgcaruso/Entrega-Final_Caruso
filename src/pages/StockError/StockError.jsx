import { Card } from 'flowbite-react';
import noStock from '../../assets/images/out-of-stock.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../components/Context/Cart/cart';

const StockError = () => {

    const { cart } = useContext(CartContext);

    return (
        <main className='main-secondary-pages items-center justify-center bg-neutral-ultra-light text-primary-inverted-hover dark:bg-primary-inverted-hover dark:text-primary'>
            <Card className='mx-2 dark:bg-primary-inverted  text-justify flex items-center justify-center max-w-lg my-3'>
                <h3 className='text-2xl text-center dark:text-primary text-primary-inverted'>Insufficient Stock</h3>
                <p className='text-md dark:text-primary-hover'>While you were selecting your items, we experienced high demand and we have run out of stock.</p>
                <p className='text-sm text-center text-red-600'>Some items have been deleted from your cart.</p>
                <img className='h-32 w-32 self-center' src={noStock} alt="Image of a rubik cube" />
                <Link className='flex w-auto border-2 border-key-color justify-center items-center rounded-md text-key-color py-1 hover:bg-key-color hover:text-primary ease-in duration-200' to={cart.length > 0 ? "/cart" : "/products"}>
                    {cart.length > 0 ? "Back to cart" : "Back to products"}
                </Link>
            </Card>
        </main>
    )
}

export default StockError