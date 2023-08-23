import { Avatar } from 'flowbite-react';
import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link as LinkRouter } from 'react-router-dom'
import { auth } from '../../../database/firebase-config';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { UserContext } from '../../Context/User/user';
import CustomToast from '../../../pages/User/CustomToast/CustomToast';


const CustomAvatar = () => {

    const { user } = useContext(UserContext);
    const signedOutUserOpt = [
        {
            name: "Sign In",
            to: "/sign-in"
        }
        ,
        {
            name: "Sign Up",
            to: "/sign-up"
        }
    ];

    const signedInUserOpt = ["Sign Out"];


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.custom((t) => (<CustomToast t={t} message="Log out successful!" />))
            })
            .catch(() => toast.custom())
    }

    const userInitial = user && user.email.charAt(0).toUpperCase();

    return (
        <Menu as="div" className="relative inline-block text-left items-center pr-2 drop-shadow-md">
            <div className='text-center align-middle'>
                <Menu.Button className="flex items-center" >
                    {
                        user ?

                            user?.photoURL ?

                                <Avatar
                                    // status="online"
                                    img={user?.photoURL}
                                    rounded
                                />
                                :
                                <div className='rounded-full bg-key-color dark:bg-key-color-hover h-[40px] hover:bg-key-color-hover dark:hover:bg-key-color ease-out duration-150 w-[40px] flex items-center justify-center'>
                                    <span className='text-2xl text-primary drop-shadow-lg'>{userInitial}</span>
                                </div>
                            :

                            <Avatar
                                // status="online"
                                img={user?.photoURL ? user?.photoURL : null}
                                rounded
                            />
                    }
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary dark:bg-primary-inverted py-1 shadow-lg focus:outline-none">


                    <div className="py-1">
                        {
                            !user ?

                                signedOutUserOpt.map((item, i) =>

                                    <Menu.Item key={i}>
                                        {({ active }) => (
                                            <LinkRouter

                                                to={item.to}
                                                className={classNames(active ? 'bg-primary-hover dark:bg-primary-inveted-hover' : '', 'block px-4 py-2 text-sm text-primary-inverted dark:text-primary dark:hover:text-primary-inverted dark:hover:bg-neutral-lighter')}
                                            >
                                                {item.name}
                                            </LinkRouter>
                                        )}
                                    </Menu.Item>
                                )

                                :

                                <div className='flex flex-col'>
                                    <div className='flex flex-col items-center justify-start dark:text-primary-hover pt-2'>

                                        {user?.displayName && < h3 className='text-sm font-semibold' > {user.displayName}</h3>}

                                        <p className='text-sm mb-2'>@{user.email.split("@")[0]}</p>
                                        <div className="divider h-[1px] bg-neutral-ultra-light dark:bg-[#222]"></div>
                                    </div>
                                    
                                    {signedInUserOpt.map((item, i) =>

                                        <Menu.Item
                                            onClick={handleSignOut}
                                            key={i}>
                                            <button
                                                className={'dark:bg-primary-inveted-hover block px-4 py-2 text-sm text-primary-inverted dark:text-primary dark:hover:text-primary-inverted dark:hover:bg-neutral-lighter w-full justify-start'}
                                            >
                                                {item}
                                            </button>

                                        </Menu.Item>
                                    )
                                    }
                                </div>
                        }

                    </div>
                </Menu.Items>
            </Transition>
        </Menu >

    )
}

export default CustomAvatar
