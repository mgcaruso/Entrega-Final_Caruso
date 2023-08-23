import '../../index.css'
import HeadBanner from '../../components/HeadBanner/HeadBanner'
import logoSolvix from '../../assets/images/logo-no-letters.png'
import video from '../../assets/videos/video3.mp4'
import RatingSection from '../../components/RatingSection/RatingSection'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <>
            <main className="flex flex-row justify-center items-center relative bg-gradient-to-r from-primary from-30% to-transparent dark:bg-gradient-to-r dark:from-primary-inverted dark:to-transparent">
                <motion.img
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{duration: 1, type:"spring", stiffness: 120}}
                    className="logo-img drop-shadow-md p-8 dark:opacity-90"
                    src={logoSolvix}
                    alt="Animated Rubik's Cube" />
                <div className="flex flex-col">
                    <HeadBanner greeting={"Solvix"} slogan={"Your Online Shop for Unmatched Cubing Excellence."} />
                </div>
                <video loop autoPlay muted className="-z-10 object-cover w-full h-full absolute filter grayscale background" src={video}></video>
            </main>
            <RatingSection />
        </>
    )
}

export default Home
