import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../../database/firebase-config';
import CustomToast from '../../pages/User/CustomToast/CustomToast';
import { FaGithub } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GitHubSignIn = ({ title }) => {
    const navigate = useNavigate();
    const signInWithGitHub = () => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((res) => {
                navigate(-1);
                toast.custom((t) => (<CustomToast t={t} displayName={res.user.displayName} imgUrl={res.user?.photoURL} message="Successful login!" />))
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);

            });

    }

    return (
        <button
            onClick={signInWithGitHub}
            className='group flex flex-row items-center flex-1 bg-primary dark:bg-primary-inverted shadow-md text-sm py-2 px-3 rounded-md dark:hover:bg-primary dark:hover:text-primary text-primary-inverted-hover dark:text-primary
                            hover:text-primary hover:bg-primary-inverted-hover
                            ease-in duration-150'
            type='button'

        >

            <FaGithub size={19} />
            <span className="pl-5">
                {title}
            </span>

        </button>
    )
}

export default GitHubSignIn