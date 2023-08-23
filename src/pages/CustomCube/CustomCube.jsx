/* eslint-disable react/no-unescaped-entities */
import { Card } from "flowbite-react"
import { useEffect } from "react";
import { useState } from "react"
import { Stepper } from "react-form-stepper"
import cubeTest from '../../utilities/cubeTest.json'
import functions from '../../utilities/functions/random.js'
import Item from "../../components/Item/Item";
import cubesData from '../../utilities/cubesData.json'

const steps = [{ label: 'Introduction' }, { label: 'Questions' }, { label: 'Result' }];
const { shuffleArray } = functions;

let options = shuffleArray(cubeTest);

const findById = (data, id) => {
    return data.find(cube => cube.id === id)
}

const recommendations = [
    {
        profile: "speedcuber",
        cube: findById(cubesData, 6)
    },
    {
        profile: "strategist",
        cube: findById(cubesData, 3)
    },
    {
        profile: "enthusiast",
        cube: findById(cubesData, 4)
    },
]
const CustomCube = () => {


    //DESPUES CAMBIAR CUANDO ESTE FIREBASE BIEN.


    const [activeStep, setActive] = useState(0);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [resultsTracker, setResultsTracker] = useState([]);
    const [selectedQtion, setSelectedQtion] = useState(null);
    const [result, setResult] = useState({});
    const [recCube, setRecCube] = useState({});
    // const [options, setOptions] = useState(shuffleArray(cubeTest));

    useEffect(() => {
        setSelectedQtion(null)
    }, [activeQuestionIndex])

    useEffect(() => {
        if (resultsTracker.length === 6) {
            const result = determineResult(resultsTracker);
            setResult(result);
            const recommendedCube = recommendations.find(cube => cube.profile == result?.profile)?.cube;
            setRecCube(recommendedCube)
        }
    }, [resultsTracker])


    const handleNext = (index, arr, state) => {
        if (index < arr?.length - 1) {
            if (state === "question") {
                setActiveQuestionIndex(index + 1);
            } else {
                setActive(index + 1);
            }
        } else {
            if (state === "question") {
                setActiveQuestionIndex(arr?.length - 1);
            } else {
                setActive(arr?.length - 1);
            }
        }

    }

    const handleOnClick = () => {
        if (activeQuestionIndex === options.length - 1) {
            handleNext(activeStep, steps, "step")
        } else {
            handleNext(activeQuestionIndex, options, "question")
        }
        setResultsTracker(pS => ([...pS, selectedQtion]))
    }

    const determineResult = (trackerArr) => {
        const profileCount = {
            speedcuber: 0,
            enthusiast: 0,
            strategist: 0
        };

        trackerArr.forEach(obj => {
            const profile = obj.profile;
            // eslint-disable-next-line no-prototype-builtins
            if (profileCount.hasOwnProperty(profile)) {
                profileCount[profile]++;
            }
        });
        const maxProfile = Object.keys(profileCount).reduce((a, b) => (profileCount[a] > profileCount[b] ? a : b));

        return { profile: maxProfile, points: profileCount[maxProfile] };
    }

    const profileDescription = [
        {
            profile: "speedcuber",
            text: "Speedcubers are masters of solving Rubik's Cubes with lightning-fast efficiency. They thrive on competition and constantly strive to beat their own solve times. Speedcubers have a deep knowledge of advanced solving methods and algorithms, allowing them to solve puzzles rapidly while maintaining precision."
        }, {
            profile: "strategist",
            text: "Strategists approach solving Rubik's Cubes with careful planning and meticulous precision. They take their time to analyze each move, focusing on solving methods that optimize efficiency and reduce the number of steps required. Strategists often enjoy tackling complex puzzles and relish the intellectual challenge they offer."
        }, {
            profile: "enthusiast",
            text: "Enthusiasts find joy in the process of solving Rubik's Cubes, valuing relaxation and creativity over speed. They appreciate the aesthetic appeal of creating colorful patterns and exploring various solving techniques. Enthusiasts may enjoy solving puzzles both alone and in a social setting, using cubing as a way to unwind and have fun."
        }

    ]

    const handleReset = () => {
        setActive(0);
        setActiveQuestionIndex(0);
        setResultsTracker([]);
        setSelectedQtion(null);
        setResult({});
        setRecCube({});
        // setOptions(shuffleArray(options))

    }

    return (
        <main className="main-secondary-pages flex items-center justify-start bg-[#f3f3f3] dark:bg-primary-inverted-hover flex-col pt-4 font-body">

            <Stepper
                steps={steps}
                className="flex w-full h-30 text-primary-inverted-hover dark:text-neutral-lighter"
                activeStep={activeStep}
                styleConfig={{
                    activeBgColor: "#549ff3",
                    activeTextColor: "#ffffff",
                    completedBgColor: "#3b75b8",
                    inactiveTextColor: "#c0c0c0"
                }}>
            </Stepper>
            <div className="card-box w-full flex items-center justify-center pb-3">

                <Card className="flex justify-center items-center max-w-[30rem] dark:bg-primary-inverted">

                    {activeStep === 1 ?
                        <>
                            <h2 className="text-center text-neutral">Question {activeQuestionIndex + 1} of {options.length}</h2>
                            <h3 className="text-center font-bold text-primary-inverted dark:text-neutral-lighter dark:font-medium">{options[activeQuestionIndex].question}</h3>
                            {
                                options[activeQuestionIndex]?.answers.map((option, i) =>
                                    <button
                                        onClick={() => {
                                            setSelectedQtion(option);
                                        }}
                                        className={`dark:text-neutral-lighter hover:shadow-md self-center text-center p-2 rounded-md ease-in duration-200 ${option?.profile === selectedQtion?.profile ? " bg-key-color text-primary" : "hover:bg-neutral-ultra-light dark:hover:bg-primary-inverted-hover hover:text-primary-inverted"}`}
                                        key={i}>{i + 1}. {option.text}</button>
                                )
                            }
                            <div className="button-box flex items-center justify-center">


                                <button disabled={!selectedQtion ? true : false} className={`px-2 py-1 border-2 border-key-color min-w-[7rem] bg-none text-key-color rounded-md drop-shadow-md ${!selectedQtion ? "border-neutral text-neutral" : "hover:bg-key-color hover:text-primary ease-in duration-200"}`}
                                    onClick={handleOnClick}>
                                    {activeQuestionIndex === options.length - 1 ? "See results" : "Next"}
                                </button>

                            </div>
                        </>

                        :
                        activeStep === 0 ?
                            <div className="flex flex-col justify-center items-center">
                                <h3 className="text-center font-bold text-primary-inverted dark:text-neutral-lighter pt-4">Welcome to the Rubik's Cube Recommendation Test</h3>
                                <img
                                    className="h-60 py-3"
                                    src="https://cdn-icons-png.flaticon.com/512/522/522103.png" alt="" />
                                <p className="text-primary-inverted-hover dark:text-neutral-lighter text-justify py-2 px-4">Get ready to elevate your cubing experience with a personalized recommendation that fits you like a glove. Let's begin!</p>

                                <button className="px-2 py-1 border-2 border-key-color min-w-[7rem] bg-none text-key-color rounded-md hover:bg-key-color hover:text-primary ease-in duration-200 drop-shadow-md" onClick={() => handleNext(activeStep, steps, "step")}>Start test</button>
                            </div>
                            :


                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm text-primary-inverted-hover dark:text-neutral-lighter">Your profile is</p>
                                <h3 className="text-center font-bold text-primary-inverted pt-4 dark:text-neutral-lighter">{result?.profile && result?.profile.toUpperCase()}</h3>
                                <p className="text-primary-inverted-hover text-justify py-2 px-4 dark:text-neutral">
                                    {profileDescription.find(desc => desc.profile === result.profile)?.text}</p>


                                <div className="suggestion-box flex w-full items-center justify-center gap-1 px-4 py-3">
                                    <div className="divider h-[1px] bg-neutral-lighter flex-1 dark:bg-primary-inverted-hover"></div>
                                    <p className="flex-1 mx-1 text-primary-inverted-hover dark:text-primary-hover">Suggested cube:</p>
                                    <div className="divider h-[1px] bg-neutral-lighter flex-1 dark:bg-primary-inverted-hover"></div>

                                </div>

                                <div className="flex justify-end flex-col items-center">

                                    {
                                        result?.profile &&
                                        <Item cube={recCube} products={cubesData} />
                                    }
                                    <button className="px-2 py-1 border-2 border-key-color min-w-[7rem] bg-none text-key-color rounded-md hover:bg-key-color hover:text-primary ease-in duration-200 drop-shadow-md my-4" onClick={handleReset}>Take test again</button>
                                </div>

                            </div>


                    }

                </Card>

            </div>





        </main >
    )
}


export default CustomCube;
