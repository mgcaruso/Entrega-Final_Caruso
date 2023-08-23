import CallBtn from "../CallBtn/CallBtn"
import './headBanner.css'
import { Link as LinkRouter } from 'react-router-dom'
import { motion } from "framer-motion"

const HeadBanner = ({ greeting, slogan }) => {
    return (
        <div className="banner-container flex flex-col justify-center">
            <motion.h1
                initial={{ opacity: 0, x: 250 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{duration: .6}}
                className="heading flex text-7xl font-medium font-heading text-primary-inverted dark:text-primary">
                {greeting}
            </motion.h1>
            <h2 className="slogan text-3xl font-body text-primary-inverted dark:text-primary">{slogan}</h2>
            <LinkRouter to="/products">
                <CallBtn word={"begin"} />
            </LinkRouter>
        </div>
    )
}

export default HeadBanner;
