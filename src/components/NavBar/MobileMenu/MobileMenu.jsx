import { Disclosure } from '@headlessui/react'
import CustomDisclosure from './CustomDisclosure/CustomDisclosure'
import { NavLink as LinkRouter } from 'react-router-dom'

const MobileMenu = ({ navigation, categories, isCategoriesOpen, setIsCategoriesOpen }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }



    return (
        <Disclosure.Panel className="sm:hidden bg-ultra-light dark:bg-primary-inverted drop-shadow-lg p-2">
            <div className="space-y-1 pb-3">
                {navigation.map((item, i) => (

                    item.name === "Categories" ?

                        //Category drop down
                        <div key={i}>

                            <CustomDisclosure list={categories} i={i} isOpen={isCategoriesOpen} setIsOpen={setIsCategoriesOpen} item={item} classNameFn={classNames} />
                        </div>


                        :
                        <LinkRouter to={item.to}  key={item.name}
                        
                            className={({isActive}) => isActive ? 'bg-primary-inverted dark:bg-neutral-lighter text-primary dark:text-primary-inverted block rounded-md px-3 py-2 text-base font-normal' : 'text-primary-inverted hover:bg-neutral-lighter hover:text-primary-inverted block rounded-md px-3 py-2 text-base font-normal dark:text-primary'}
                        >
                            <Disclosure.Button
                                aria-current={item.current ? 'page' : undefined}
>
                                {item.name}

                            </Disclosure.Button>
                        </LinkRouter>
                ))}
            </div>

        </Disclosure.Panel>
    )
}

export default MobileMenu;
