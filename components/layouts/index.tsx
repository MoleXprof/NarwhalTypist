import Head from 'next/head'
import Header from '../header'
import Footer from '../footer'
import { IoMdRefresh } from "react-icons/io";
import { generate } from 'random-words';
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaMousePointer } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { Status } from '../constants/constants';

type Letter = {
	readonly value: string;
	readonly typed: boolean;
	readonly correct: boolean;
}

type Word = Letter[];

const SECONDS = 30;
const NUM_WORDS = 200;

// convert chars into letter object
const convertCharToLetterObject = (words: string[]): Word[] => {
	return words.map((word) => 
		word.split('').map((char) => ({
			value: char,
			typed: false,
			correct: false
		}))
	);
};

const HomePage = () => {	
	const router = useRouter();
    const [isFocused, setIsFocused] = useState(true);
    const [countDown, setCountDown] = useState(SECONDS);
	const [currentInput, setCurrentInput] = useState("");
	const [words, setWords] = useState([]);
	// const [currentWordIndex, setCurrentWordIndex] = useState(0);
    // const [correct, setCorrect] = useState(0);
    // const [incorrect, setIncorrect] = useState(0);
    const [status, setStatus] = useState(Status.WAITING);
	const [isMac, setIsMac] = useState(false);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// checks if the user is on a mac or not
	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsMac(/Mac/.test(navigator.userAgent));
		}
	}, []);

	// generate 200 random words
	useEffect(() => {
		const generatedWords = generate(NUM_WORDS);
		setWords(convertCharToLetterObject(Array.isArray(generatedWords) ? generatedWords : [generatedWords]));
	}, []);

	// reset the test
	const resetTest = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);

		const generatedWords = generate(NUM_WORDS);
		setWords(convertCharToLetterObject(Array.isArray(generatedWords) ? generatedWords : [generatedWords]));
		setStatus(Status.WAITING);
		setCountDown(SECONDS);
		setCurrentInput("");
	};

	// redirect to results page when test is finished
	useEffect(() => {
        if (status === Status.FINISHED) {
            router.push("/results");
        }
    }, [status, router]);

	// if not focused on the page, blur the text
    useEffect(() => {
        if (typeof document === "undefined") return;

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
    }, []);

	// start the test
	const startTest = useCallback(() => {
		if (status !== Status.STARTED) {
			setStatus(Status.STARTED);

			if (intervalRef.current) clearInterval(intervalRef.current);

			// Start a new interval and store it in ref
			intervalRef.current = setInterval(() => {
				setCountDown((prevCountDown) => {
					if (prevCountDown === 0) {
						clearInterval(intervalRef.current!);
						setStatus(Status.FINISHED);
						return 0;
					} else {
						return prevCountDown - 1;
					}
				});
			}, 1000);
		}
	}, [status]);

	// start the test when the component mounts
	useEffect(() => {
		const handleKeyPress = (event) => {
			if (status === Status.WAITING && event.key !== 'Meta' && event.key !== 'Tab') startTest();
		};
	
		document.addEventListener("keydown", handleKeyPress);
	
		// Cleanup the event listener when status changes
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [startTest, status]);

	useEffect(() => {
		const handleType = (event) => {
			if (event.key === 'Backspace') {
				setCurrentInput(currentInput => currentInput.slice(0, -1));
				// set the previous letter to not typed and correct to false
				return;
			}

			if (event.key === 'Tab') { // on tab focus the new test button
				event.preventDefault();

				const newTestButton = document.getElementById('newTestButton');
				if (newTestButton) {
					newTestButton.focus();
				}
			}

			if (event.key === 'Space') { // change to space
				// check if the input is correct
				// check if that entire word is spelt correctly
				setCurrentInput("");
			}

			setCurrentInput(currentInput => currentInput + event.key);
		};
	
		document.addEventListener("keydown", handleType);
	
		return () => {
			document.removeEventListener("keydown", handleType);
		};
	}, [currentInput]);
	
    // const handleKeyDown = ({keyCode}) => {
    //     // change so it is not keyCode but event.key
    //     if (keyCode == 32) { // if user enters a space
    //         checkMatch()
    //         setCurrentInput("")
    //         setCurrentWordIndex(currentWordIndex + 1)
    //     }
        
    //     // console.log(event.key)
    // };

	// const checkMatch = () => {
    //     const wordToCompare = words[currentWordIndex]
    //     if (wordToCompare === currentInput.trim()) {
    //         setCorrect(correct + 1)
    //     } else {
    //         setIncorrect(incorrect + 1)
    //     }
    // };

    return (
        <div className='bg-sky-150 dark:bg-dark-bg h-screen w-full px-20 flex flex-col justify-between'>
			<Head>
				<title>{"NarwhalTypist"}</title>
				<meta name="title" content="NarwhalTypist" />
				<meta
					name="description"
					content="Typing Speed Tester"
				/>
				<link rel="shortcut icon" href="/images/narwhal.jpg" />
			</Head>

			<Header status={status} />

			<div className='flex flex-col justify-center items-center'>
				<div className="w-full">
					{ status === Status.WAITING ?
						<div className="flex justify-center items-center gap-4 text-gray-400 text-md dark:text-dark-text">
							<FaGlobeAmericas />
							<div> {"english"} </div>
						</div> : <div className="h-[24px]" />
					}
					{status === Status.STARTED ?
						<div className="text-sky-400 dark:text-dark-highlight font-extrabold text-4xl">
							{countDown}
						</div> :
						<div className="h-[40px]" />
					}
					
					<div className="relative w-full max-h-[124px]">
						<div className={`w-full max-h-[124px] flex flex-wrap gap-2 justify-start items-center ${isFocused ? "" : "blur"} text-3xl tracking-normal overflow-hidden`}>
							{words.map((word: Word, index: number) => (
								<div key={index} className="flex pr-3">
									{word.map((letter: Letter, letterIndex: number) => (
										<p key={letterIndex} className={`dark:text-dark-text text-gray-400
										${letter.typed ? letter.correct
												? "text-black dark:text-dark-text-correct"
												: "text-red-600 dark:text-red-600 underline"
											: ""
										}`}>
											{letter.value}
										</p>
									))}
								</div>
							))}
						</div>

						{!isFocused ?
							<div className="absolute top-1/3 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-correct m-4">
								<div className="flex gap-2 text-center justify-center items-center">
									<FaMousePointer />
									<p>{"Click here or any key to focus"}</p>
								</div>
							</div>
							: null
						}
					</div>
				</div>

				<button id="newTestButton" type="button" className="text-gray-400 hover:text-gray-500 dark:text-dark-text dark:hover:text-dark-text-highlight p-4 my-[40px]" onClick={resetTest}>
					<IoMdRefresh className="h-6 w-6" />
				</button>
			</div>

			{status !== Status.STARTED ?
				<div>
					<div className='flex justify-center items-center text-gray-400 dark:text-dark-text gap-2 text-sm'>
						<div className='dark:text-dark-bg bg-dark-text px-2 py-0.5 rounded-sm text-xs'>{isMac ? "cmd" : "ctrl"}</div> + <div className='dark:text-dark-bg bg-dark-text px-2 py-0.5 rounded-sm text-xs'>R</div> - reset test
					</div>
					<Footer/> 
				</div>
				: <div className='h-[48px]'/>
			}
    	</div>
    );
};

export default HomePage;