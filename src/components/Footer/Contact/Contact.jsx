import { FaEnvelope, FaPhoneFlip, FaHouse } from "react-icons/fa6";

const Contact = () => {
    return (
        <section className='right basis-2/6 '>
            <div className='first-section flex flex-col w-full items-center'>
                <h3 className="uppercase">Contact</h3>
                <div className="divider bg-neutral-lighter dark:bg-[#444]"></div>

            </div>
            <div className='second-section flex-col gap-2 font-normal dark:font-thin'>
                <p className="flex items-center">
                    <span className='li-item px-3'><FaHouse /></span>
                    <span className='li-item'>1660 Darwin Parkway</span>
                </p>
                <p className="flex items-center">
                    <span className='li-item px-3'><FaPhoneFlip /></span>
                    <span className='li-item'>387-662-6717</span>
                </p>
                <p className="flex items-center">
                    <span className='li-item px-3'><FaEnvelope /></span>
                    <span className='li-item'><a href="mailto:solvix@gmail.com">solvix@gmail.com</a></span>
                </p>

            </div>
        </section>
    )
}

export default Contact
