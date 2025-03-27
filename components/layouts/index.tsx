import Head from 'next/head'
import Header from '../header'
import Footer from '../footer'
import { IoMdRefresh } from "react-icons/io";
import { NUM_WORDS } from "../../pages/index"
import { generate } from 'random-words';
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaMousePointer } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

type HomeProps = {
	readonly words: string[], 
	readonly setWords: (arg: string | string[]) => {}
}

const HomePage = ({ words, setWords }: HomeProps) => {	
	const router = useRouter();
    const [isFocused, setIsFocused] = useState(true);
    const [countDown, setCountDown] = useState(30);
	const [currentInput, setCurrentInput] = useState("");
    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    // const [correct, setCorrect] = useState(0);
    // const [incorrect, setIncorrect] = useState(0);
    const [status, setStatus] = useState("waiting");
    const displayedWords = words.slice(0, 30); // display enough words so it fills 3 lines

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// generate 200 random words
	const resetTest = () => {
		setWords(generate(NUM_WORDS));
	};

	// redirect to results page when test is finished
	useEffect(() => {
        if (status === "finished") {
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
		if (status !== "started") {
			setStatus("started");

			// Clear any existing interval
			if (intervalRef.current) clearInterval(intervalRef.current);

			// Start a new interval and store it in ref
			intervalRef.current = setInterval(() => {
				setCountDown((prevCountDown) => {
					if (prevCountDown === 0) {
						clearInterval(intervalRef.current!);
						setStatus("finished");
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
		const handleKeyPress = () => {
			if (status === "waiting") startTest();
		};
	
		document.addEventListener("keydown", handleKeyPress);
	
		// Cleanup the event listener when status changes
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [startTest, status]);

	useEffect(() => {
		const handleType = (event) => {
			setCurrentInput(currentInput + event.key);
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
        <div className='bg-sky-50 h-screen w-full px-20 flex flex-col justify-between'>
			<Head>
				<title>{"NarwhalTypist"}</title>
				<meta name="title" content="NarwhalTypist" />
				<meta
					name="description"
					content="Typing Speed Tester"
				/>
				<link rel="shortcut icon" href="/images/narwhal.jpg" />
			</Head>

			<Header />

			<div className='flex flex-col justify-center items-center'>
				<div className="w-full">
					{ status === "waiting" ?
						<div className="flex justify-center items-center gap-2 text-gray-400 text-md">
							<FaGlobeAmericas />
							<div> {"english"} </div>
						</div> : <div className="h-[24px]" />
					}
					{status === "started" ?
						<div className="text-sky-400 font-extrabold text-4xl">
							{countDown}
						</div> :
						<div className="h-[40px]" />
					}
					
					<div className="relative w-full">
						<div className={`w-full flex flex-wrap gap-2 justify-start items-center text-gray-400 ${isFocused ? "" : "blur"} text-3xl tracking-normal`}>
							{displayedWords.map((word, index) => (
								<div key={index} className="flex pr-3">
									{word.split("").map((char, charIndex) => (
										<div key={charIndex}>
											{char}
										</div>
									))}
								</div>
							))}
						</div>

						{!isFocused ?
							<div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-gray-400">
								<div className="flex gap-2 text-center justify-center items-center">
									<FaMousePointer />
									<p>{"Click here or any key to focus"}</p>
								</div>
							</div>
							: null
						}
					</div>
				</div>

				<button type="button" className="relative group text-gray-400 hover:text-gray-500 py-10" onClick={resetTest}>
					<IoMdRefresh className="h-6 w-6" />
					<span className="mt-2 absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
						{"New Test"}
					</span>
				</button>
			</div>

			<Footer/>
    	</div>
    );
};

export default HomePage;