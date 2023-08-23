import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { transitionClasses } from '../../../utilities/Transitions/TransitionClasses'
import { HiChevronDown } from "react-icons/hi2";
import { Link as LinkRouter } from 'react-router-dom'

const CustomDropDown = ({ title, index, categories }) => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [open, setOpen] = useState(false);

    return (
        <Menu key={index} as="div" className="relative ml-3 rounded-md">
            <div>
                <Menu.Button onClick={() => setOpen(!open)} className="font-normal flex rounded-md text-sm focus:outline-none">

                    <Menu.Item>
                        {({ active }) => (
                            <div
                                
                                className={classNames(active ? 'rounded-md dark:bg-primary-inverted-hover' : '', 'flex items-center rounded-md px-1 py-2 text-sm text-primary-inverted dark:text-primary')}
                            >
                                <span className='mx-2'>
                                    {title}
                                </span>


                                <HiChevronDown />


                            </div>
                        )}
                    </Menu.Item>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                {...transitionClasses.dropdown}
            >
                <Menu.Items className="absolute -left-1 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary dark:bg-primary-inverted py-1 shadow-lg focus:outline-none">
                    {
                        categories.map((category, index) =>
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <LinkRouter
                                        onClick={() => setOpen(false)}
                                        to={`/category/${category}`}
                                        className={classNames(active ? 'bg-primary-hover dark:bg-primary-inveted-hover' : '', 'block px-4 py-2 text-sm text-primary-inverted dark:text-primary dark:hover:text-primary-inverted dark:hover:bg-neutral-lighter')}
                                    >
                                        {category}
                                    </LinkRouter>
                                )}
                            </Menu.Item>
                        )
                    }

                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default CustomDropDown;
