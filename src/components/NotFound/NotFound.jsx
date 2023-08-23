import notFoundImg from '../../assets/images/not-found.png'
import { motion } from 'framer-motion'

const NotFound = () => {
    return (
        <div
        className="not-found flex justify-center flex-grow min-h-[var(--main-height)] items-center flex-col dark:bg-primary-inverted-hover ">
            <motion.img 
            className='h-60 brightness-200 dark:invert' src={notFoundImg} alt="Image of a rubik's cube uncomplete" 

            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 0.5 }} 
            />
            <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 0.5 }} 
            className='text-lg text-primary-inverted font-thin dark:text-primary'>Sorry, there are no results matching your search. </motion.h3>
        </div>
    )
}

export default NotFound
