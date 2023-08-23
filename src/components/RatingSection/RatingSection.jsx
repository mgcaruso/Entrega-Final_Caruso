import './ratingSection.css'
import solvixLogo from '../../assets/images/logo-no-letters.png'
import backDark from '../../assets/images/dark-rating.jpg'
import backLight from '../../assets/images/rating.jpg'
import oneCube from '../../assets/images/one-cube.png'
import oneDarkCube from '../../assets/images/one-cube-dark.jpg'
import { useContext } from 'react'
import { ThemeContext } from '../Context/Theme/theme';

const RatingSection = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <div className='rating-box min-h-[50vh] flex sm:flex-row flex-col'>
            <div className="a-section flex justify-center items-center basis-1/2 border-box relative bg-gradient-to-r from-transparent dark:to-black  flex-col ">
                <img className='p-5 h-40 absolute' src={solvixLogo} alt="Cube" />
                <svg id="rotatingText" viewBox="0 0 200 200" width="260" height="260">
                    <defs>
                        <path
                            id="circle"
                            d="M 100, 100
                                m -75, 0
                                a 75, 75 0 1, 0 150, 0
                                a 75, 75 0 1, 0 -150, 0"
                        />
                    </defs>
                    <text width="400">
                        <textPath
                            style={{ fill: theme === "light" ? "var(--primary-inverted)" : "var(--primary)" }}
                            xlinkHref="#circle" >
                            SOLVIX: Trusted by Cubers Worldwide!
                        </textPath>
                    </text>
                </svg>
                {
                    theme === "dark" ?
                        <img className='absolute -z-10 object-fill object-center w-full h-full' src={backDark} alt="Background image of cubes" />
                        :
                        <img className='absolute -z-10 object-fill object-center w-full h-full' src={backLight} alt="Background image of cubes" />
                }

            </div>
            <div className='min-h-[50vh] b-section w-full  relative overflow-hidden flex basis-1/2 '>
                <div
                    style={{ backgroundImage: theme === "light" ?  `url(${oneCube})` : `url(${oneDarkCube})` }}
                    className="heading-frame after:border-2 after:border-primary-inverted-hover before:border-2 before:border-primary-inverted-hover dark:after:border-primary-hover dark:before:border-primary-hover">
                    <h2 className='pic-title  text-primary-inverted-hover dark:text-primary'>32K+<br />trusted</h2>
                </div>
            </div>
        </div>
    )
}

export default RatingSection
