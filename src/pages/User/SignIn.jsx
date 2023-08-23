

import { useState, useId } from 'react';
import { auth } from '../../database/firebase-config'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiEnvelope, HiEye, HiEyeSlash } from "react-icons/hi2";
import logoSolvix from '../../assets/images/logo-no-letters.png'
import PrimaryBtn from '../../components/CustomBtns/PrimaryBtn';
import video from '../../assets/videos/video3.mp4'
import CustomToast from './CustomToast/CustomToast';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import GitHubSignIn from '../../components/GitHubSignIn/GitHubSignIn';

const SignIn = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                
                navigate(-1);
                if (userCredential.user.emailVerified) { //Ya es verifico la cuenta por mail
                    
                    toast.custom( t => <CustomToast t={t} displayName={ userCredential.user.email} imgUrl={userCredential.user.photoURL} message={"Welcome to Solvix, " + userCredential.user.email + "." } /> )
                    
                } else {
                    toast.custom( t => <CustomToast t={t} displayName={userCredential.user.email} message={"Welcome, " + userCredential.user.email + ". Please, verify your account in order to purchase our products." }  /> )
                    
                }

            })
            .catch(err => {
                console.log(err)
                toast.error("Check the data provided and try again.")
            });
    }

    

    const emailId = useId();
    const passwordId = useId();


    return (

        <main className='min-h-[80vh] flex items-center justify-center'>

            <div className="hidden sm:flex col-1 flex-1 items-center justify-center min-h-[80vh] overflow-hidden relative 
            ">
                <div className='b-radius min-h-[80vh] min-w-full bg-neutral-ultra-light dark:bg-primary-inverted-hover object-cover absolute -z-6' ></div>
                <div className='absolute flex flex-col justify-center items-center font-heading'>
                    <img className="h-40 z-2" src={logoSolvix} alt="Solvix Logo" />
                    <h3 className='text-6xl text-primary-inverted py-2 dark:text-primary'>SOLVIX</h3>

                </div>
                <video loop autoPlay muted className="clip -z-10 object-cover w-full h-full absolute filter grayscale background" src={video}></video>
            </div>

            <div className="col-2 flex-1 flex justify-center bg-neutral-ultra-light dark:bg-primary-inverted-hover min-h-[80vh] w-full">

                <form
                    onSubmit={signIn}
                    className="flex max-w-md flex-col gap-4 justify-center py-6">
                    <div className="group relative mx-2">


                        <h3 className='text-md text-primary-inverted dark:text-primary font-body w-full'>Continue your Puzzle Journey -</h3>
                        <h3 className='text-4xl text-primary-inverted py-2 dark:text-primary font-body w-full'>Sign In to Solvix:</h3>
                        <div className="divider h-[1px] bg-[#C0C0C0] dark:bg-[#555] mb-4"></div>

                        <label className='font-body dark:text-primary' htmlFor={emailId}>
                            Email:
                        </label>
                        <div className="emailBox group-focus-within:ring-2 flex items-center justify-center border-primary-inverted border-2 px-2 rounded-md dark:text-primary dark:border-primary">

                            <HiEnvelope className='text-primary-inverted dark:text-primary' size={19} />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='john_doe@gmail.com'
                                className='border-none focus:ring-0 bg-inherit'
                                type="text"
                                name="email"
                                id={emailId}
                                required
                            />
                        </div>
                    </div>

                    <div className="group relative mx-2">
                        <label className='font-body dark:text-primary' htmlFor={emailId}>
                            Password:
                        </label>
                        <div className="emailBox group-focus-within:ring-2 flex items-center justify-center border-primary-inverted border-2 px-2 rounded-md dark:text-primary dark:border-primary">
                            {
                                showPassword ?

                                    <HiEyeSlash onClick={() => setShowPassword(false)} className='text-primary-inverted dark:text-primary' size={19} />
                                    :
                                    <HiEye onClick={() => setShowPassword(true)} className='text-primary-inverted dark:text-primary' size={19} />
                            }
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='border-none focus:ring-0 bg-inherit'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id={passwordId}
                                required
                            />
                        </div>
                    </div>

                    <div className="alter-log mx-2 flex justify-between items-center gap-1 font-body">
                        <GoogleSignIn title={"Sign In"} />


                        <GitHubSignIn title={"Sign In"}/>





                    </div>

                    <PrimaryBtn
                        type={"submit"}

                    >
                        Sign In
                    </PrimaryBtn>



                </form>
            </div>
        </main >
    )
}

export default SignIn;
