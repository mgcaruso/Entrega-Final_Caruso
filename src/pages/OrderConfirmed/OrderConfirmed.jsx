
import { Card } from 'flowbite-react';
import TableDetails from './TableDetails';
import { Link } from 'react-router-dom';

const OrderConfirmed = ({ details }) => {

    const { _id } = details;

    return (
        <main className="main-secondary-pages items-center justify-center flex flex-col bg-neutral-lighter dark:bg-primary-inverted-hover text-primary-inverted dark:text-primary">
            <Card
                className="confirmation-card max-w-lg bg-primary-hover dark:bg-primary-inverted font-body my-2 mx-2 py-3" >

                <h5 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
                    Your purchase is confirmed!
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-justify pb-2">
                    Thank you for shopping with Solvix, your premier destination for Rubik&#39;s Cubes and puzzle enthusiasts. We&#39;re excited to confirm your recent purchase.
                </p>

                <p className='text-sm font-medium pb-2'>Purchase ID: <span className='mx-2 font-normal'>{_id}</span></p>


                <TableDetails details={details} />

                <div className='flex items-center justify-center'>

                    <Link
                        to="/"
                        className='border-2 border-key-color px-3 py-2 rounded-md text-key-color hover:bg-key-color hover:text-primary ease-in duration-300'>
                        Back to Home
                    </Link>

                </div>
            </Card>

        </main>
    )
}

export default OrderConfirmed