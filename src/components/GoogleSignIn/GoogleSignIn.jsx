import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../database/firebase-config';
import CustomToast from '../../pages/User/CustomToast/CustomToast';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const GoogleSignIn = ({ title }) => {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(res => {

                toast.custom((t) => (<CustomToast t={t} displayName={res.user.displayName} imgUrl={res.user?.photoURL} message={`Welcome,${res.user.displayName}!`} />))
                navigate(-1);
            })
            .catch(err => console.log(err.message))
    }

    return (
        <button
            className=' flex flex-row items-center flex-1 bg-primary dark:bg-primary-inverted shadow-md text-sm py-2 px-3 rounded-md dark:hover:bg-primary dark:hover:text-primary-inverted-hover text-primary-inverted-hover dark:text-primary
                            hover:text-primary hover:bg-primary-inverted-hover
                            ease-in duration-150'
            type='button'
            onClick={signInWithGoogle}
        >

            <FcGoogle size={20} />
            <span className="pl-5">
                {title}
            </span>

        </button>
    )
}

export default GoogleSignIn