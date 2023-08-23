import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../database/firebase-config'
import logoSolvix from '../../assets/images/logo-no-letters.png'
import video from '../../assets/videos/video3.mp4'
import PrimaryBtn from '../../components/CustomBtns/PrimaryBtn';
import { HiEnvelope, HiEye, HiEyeSlash } from "react-icons/hi2";
import { Checkbox, Label, Flowbite } from 'flowbite-react';
import { toast } from 'react-hot-toast';
import CustomToast from './CustomToast/CustomToast';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import GitHubSignIn from '../../components/GitHubSignIn/GitHubSignIn'

export default function SignUp() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const emailId = useId();
    const passwordId = useId();
    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();
        if (!isChecked) {
            toast.error("You need to accept the terms and conditions.");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            toast.custom(t => <CustomToast t={t} displayName={userCredential.user.email} message={"Email verification sent to " + userCredential.user.email + " . Please, verify your account in order to purchase our products."} />)
                            navigate(-1);

                        })
                        .catch(err => toast.error(err.message))

                })
                .catch(err => {
                    toast.error(err.message)
                });
        }
    }

    const customTheme = {
        checkbox: {
            root: {
                base: "h-4 w-4 rounded border border-gray-400 bg-gray-100 focus:ring-2 focus:ring-key-color dark:border-gray-600 dark:bg-neutral dark:ring-offset-gray-800 dark:focus:ring-key-color text-key-color"
            }
        }
    }

    return (
        <main className='min-h-[80vh] flex items-center justify-center'>

            <div className="col-2 flex-1 flex justify-center bg-neutral-ultra-light dark:bg-primary-inverted-hover min-h-[80vh] w-full ">

                <form
                    onSubmit={signUp}
                    className="flex max-w-md flex-col gap-4 justify-center py-7">
                    <div className="group relative mx-2">
                        <h3 className='text-2xl text-primary-inverted dark:text-primary font-body pr-4'>Join the Cuber</h3>

                        <h3 className='text-4xl text-primary-inverted py-1 dark:text-primary font-body w-full'> Community</h3>
                        <div className="divider h-[1px] bg-[#C0C0C0] dark:bg-[#555] mb-4"></div>
                        <label className='font-body dark:text-primary' htmlFor={emailId}>
                            Email:
                        </label>
                        <div className="emailBox group-focus-within:ring-2 flex items-center justify-center border-primary-inverted border-2 px-2 rounded-md dark:text-primary dark:border-primary">

                            <HiEnvelope className='text-primary-inverted dark:text-primary' size={19} />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='john_doe@gmail.com'
                                className='border-none focus:ring-0 bg-inherit w-full flex-1'
                                type="text"
                                name="email"
                                id={emailId}
                                required
                            />
                        </div>
                    </div>

                    <div className="group relative mx-2 ">
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
                                className='border-none focus:ring-0 bg-inherit w-full flex-1'
                                type={showPassword ? "text" : "password"}
                                name="Password"
                                id={passwordId}
                                required
                            />
                        </div>
                    </div>

                    <div className="mx-2 flex gap-1">
                        <GoogleSignIn title={"Sign Up"} />
                        <GitHubSignIn title={"Sign Up"} />
                    </div>

                    <div className="flex items-center gap-2 mx-2">
                        <Flowbite theme={{ theme: customTheme }}>
                            <Checkbox
                                onClick={(e) => e.target.checked ? setIsChecked(true) : setIsChecked(false)} id="remember" />
                        </Flowbite>
                        <Label htmlFor="remember" className='font-body font-normal text-primary-inverted '>
                            Accept Solvix <a href='#' className='text-key-color hover:underline ease-in duration-200'>terms and conditions</a>.
                        </Label>
                    </div>

                    <PrimaryBtn
                        type={"submit"}

                    >
                        Register
                    </PrimaryBtn>
                </form>
            </div>


            <div className="hidden sm:flex col-1 flex-1 items-center justify-center min-h-[80vh] bg-gradient-to-r from-transparent from-30% to-neutral-ultra-light dark:bg-gradient-to-r dark:from-transparent dark:to-primary-inverted-hover overflow-hidden relative 
        ">
                <div className='b-sign-up min-h-[80vh] min-w-full bg-neutral-ultra-light dark:bg-primary-inverted-hover object-cover absolute -z-6'></div>
                <div className='absolute flex flex-col justify-center items-center font-heading h-full'>
                    <img className="h-40 z-2" src={logoSolvix} alt="Solvix Logo" />
                    <h3 className='text-6xl text-primary-inverted py-2 dark:text-primary'>SOLVIX</h3>

                </div>
            </div>
            <video loop autoPlay muted className="clip -z-10 object-cover w-full h-full absolute filter grayscale background" src={video}></video>

        </main >

    )
}

