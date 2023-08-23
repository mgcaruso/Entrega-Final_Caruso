import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG } from "react-icons/fa6";
import './followUs.css'

const FollowUs = () => {
    const iconSize = "24px";
    return (
        <section className="middle basis-2/6">
            <div className="first-section w-full items-center">
                <h3 className="uppercase text-center">Follow us</h3>
                <div className="divider bg-neutral-lighter dark:bg-[#444]"></div>

            </div>

            <section className='second-section relative h-[100px] w-full'>
                <ul className='social-media flex flex-wrap w-full justify-center flex-col sm:flex-row items-center'>
                    <li>
                        <a className="facebook flex items-center justify-center" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <FaFacebookF size={iconSize} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a className="twitter flex items-center justify-center" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <FaTwitter size={iconSize} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a className="instagram flex items-center justify-center" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <FaInstagram size={iconSize} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a className="google flex items-center justify-center" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <FaGooglePlusG size={iconSize} aria-hidden="true" />
                        </a>
                    </li>
                </ul>
            </section>

        </section>

    )
}

export default FollowUs
