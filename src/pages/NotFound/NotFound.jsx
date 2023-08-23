import notFoundImage from '../../assets/images/not-found.png'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <main className='bg-neutral-lighter dark:bg-primary-inverted flex flex-col justify-center items-center font-body'>
            <img className='h-60 dark:invert' src={notFoundImage} alt="Rubik's cube image" />
            <h3 className='text-xl text-primary-inverted dark:text-primary px-3 text-center'>Sorry, the page you are looking for does not exist.</h3>
            <RouterLink className='text-xl py-2 text-key-color hover:underline' to="/">Back to Solvix</RouterLink>
        </main>
    )
}

export default NotFound;
