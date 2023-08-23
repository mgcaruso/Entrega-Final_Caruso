import './about.css'
import logoSolvix from '../../assets/images/logo-no-letters.png'
import { HiOutlineCube } from "react-icons/hi";


const About = () => {
    const list = [
        {
            span: "Wide Range of Rubik's Cubes",
            content: "We take pride in offering an extensive collection of Rubik's cubes from leading brands worldwide. Whether you're looking for the classic 3x3 cube, complex speedcubes, or unique puzzle variations, we've got you covered."
        },
        {
            span: "Quality and Authenticity",
            content: "At Solvix, we prioritize quality and authenticity. All our products are sourced directly from reputable manufacturers, ensuring that you receive genuine and high-performing cubes."
        },
        {
            span: "Fast and Reliable Shipping",
            content: "Your satisfaction is our top priority. We strive to deliver your orders swiftly and securely, so you can start solving as soon as possible."
        },
        {
            span: "Customer Satisfaction Guarantee",
            content: "We stand by the quality of our products. If, for any reason, you are not satisfied with your purchase, our dedicated customer support team will ensure that any issues are promptly resolved."
        }
    ]

    return (
        <main className="flex flex-col items-center justify-center bg-primary-hover dark:bg-primary-inverted-hover dark:text-primary dark:font-thin">
            <h2 className='font-heading text-6xl text-primary-inverted dark:text-primary pt-6 pb-4 mt-3 px-3 text-center'>ABOUT US</h2>
            <div className='flex justify-center w-full flex-col sm:flex-row' >
                <div className="flex flex-col basis-1/2 justify-center p-5">

                    <section className="image-section flex flex-col justify-center px-8 py-3 font-body">
                        <h3 className='text-xl text-center'>OUR MISSION</h3>
                        <div className="divider h-[1px] bg-primary-inverted dark:bg-neutral-lighter opacity-20"></div>
                        <p className='text-justify'>Our mission at Solvix is simple: to be your go-to online store for unparalleled cubing excellence. We aim to inspire and support cubing enthusiasts, whether you&lsquo; re a seasoned speedcuber or just starting on your cubing journey.</p>
                    </section>
                    <section className="image-section flex flex-col justify-center py-5 px-8  font-body">
                        <h3 className='text-xl text-center'>JOIN THE SOLVIX COMMUNITY</h3>
                        <div className="divider h-[1px] bg-primary-inverted opacity-20 dark:bg-neutral-lighter"></div>
                        <p className='text-justify'>At Solvix, we believe that speedcubing is not just a hobby; it&lsquo; s a journey of discovery, problem-solving, and personal growth. We invite you to join our thriving community of cubers, where you can connect with like-minded individuals, share your experiences, and participate in exciting events and competitions.</p>
                    </section>
                </div>
                <section className="text-section basis-1/2 flex flex-col justify-start items-center">
                    <div className="flex items-center justify-center flex-grow w-full overflow-hidden p-5">
                        <div className='absolute flex flex-col justify-center items-center font-heading'>
                            <img className="h-44 z-2" src={logoSolvix} alt="Solvix Logo" />
                            <h3 className='text-6xl text-primary-inverted py-2 dark:text-primary'>SOLVIX</h3>
                        </div>
                    </div>
                </section>

            </div>


            <div className='flex justify-center w-full flex-col-reverse sm:flex-row'>

                <section className="text-section basis-1/2 flex flex-col justify-start items-center ">
                    <div className="flex items-center justify-center flex-grow w-full overflow-hidden">
                        {/* <img className='h-28 m-3' src={logo} alt="Solvix Logo" /> */}
                        <img className='w-full h-full object-cover rounded-tr-[40%]' src={"https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"} alt="Solvix Logo" />

                    </div>
                </section>
                <div className="flex flex-col basis-1/2 justify-center p-5">

                    <section className="image-section flex flex-col justify-center px-8 font-body mt-3">
                        <h3 className='text-xl text-center'>WHY CHOOSE SOLVIX?</h3>
                        <div className="divider h-[1px] bg-primary-inverted opacity-20 dark:bg-neutral-lighter"></div>

                        {list.map((item, index) =>
                            <div className="flex relative py-2" key={index}>
                                <HiOutlineCube style={{ transform: "translateY(2px)" }} size={20} className='mr-2 absolute' />
                                <span className='text-justify'>
                                    <span className='item-span ml-7'>{item.span}: </span>
                                    {item.content}</span>
                            </div>
                        )}




                    </section>
                    <section className="image-section flex flex-col justify-center py-5 px-8  font-body">
                        <h3 className='text-xl text-center'>LET&lsquo;S SOLVE TOGETHER</h3>
                        <div className="divider h-[1px] bg-primary-inverted opacity-20 dark:bg-neutral-lighter"></div>
                        <p className='text-justify'>Thank you for choosing Solvix as your trusted destination for top-notch Rubik&lsquo; s cubes. Together, let&lsquo; s embark on an exhilarating journey of unmatched cubing excellence. Happy solving!

                            .</p>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default About
