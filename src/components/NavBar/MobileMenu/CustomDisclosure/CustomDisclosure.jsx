import { Disclosure, Transition } from '@headlessui/react'
import { FiChevronDown } from "react-icons/fi";
import { transitionClasses } from '../../../../utilities/Transitions/TransitionClasses';
import { NavLink } from 'react-router-dom';

const CustomDisclosure = ({ list, i, isOpen, setIsOpen, item, classNameFn }) => {

    return (
        <div key={i} className="mt-2 bg-ultra-light dark:bg-primary-inverted">

            <>
                <button onClick={() => setIsOpen(!isOpen)} style={{ width: "100%" }} className="rounded-md px-3 py-2 text-base font-normal flex justify-between text-primary-inverted dark:text-primary" >{item.name}

                    <FiChevronDown
                        className={`${isOpen ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-primary-inverted dark:text-primary`}
                    />
                </button>

                <Transition
                    show={isOpen}
                    {...transitionClasses.flyOutTop}
                >

                    {
                        isOpen &&
                        <section className="categories-section pl-4">
                            {
                                list.map((category, index) =>

                                    <Disclosure.Button
                                        onClick={() => setIsOpen(false)}
                                        key={index}
                                        as={NavLink}
                                        to={`category/${category}`}
                                        className={classNameFn(
                                            item.current ? 'bg-primary-inverted text-primary dark:bg-primary dark:bg-text-primary-inverted' : 'text-primary-inverted dark:text-primary  hover:bg-neutral-lighter hover:text-primary-inverted dark:hover:text-primary',
                                            'block rounded-md px-3 py-2 text-base font-normal '
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {category}

                                    </Disclosure.Button>)
                            }
                        </section>
                    }

                </Transition>

            </>

        </div>
    )
}

export default CustomDisclosure;
