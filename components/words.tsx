import { useState, useEffect, useRef } from "react";
import { FaMousePointer } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

type WordsProps = {
    readonly words: string[]
}

const Words = ({ words }: WordsProps) => {
    const [isFocused, setIsFocused] = useState(true);
    const [countDown, setCountDown] = useState(30);
    const [currentInput, setCurrentInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [status, setStatus] = useState("waiting");
    const displayedWords = words.slice(0, 30); // display enough words so it fills 3 lines

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
    }, []);

    useEffect(() => {
        // document.addEventListener("keydown", handleKeyDown);

        

        // return () => {
        //     document.removeEventListener("keydown", handleKeyDown);
        // }
        // rerender when there is a keydown
    }, [])

    const startTest = () => {
        let interval = setInterval(() => {
            setCountDown((prevCountDown) => {
                if (prevCountDown === 0) {
                    // maybe set to 0 or break out of it 
                    // set status to finished
                    clearInterval(interval);
                } else {
                    return prevCountDown - 1;
                }
            })
        }, 1000);
        inputRef.current?.focus()
        setStatus("started")
    }

    const handleKeyDown = ({keyCode}) => {
        // change so it is not keyCode but event.key
        if (keyCode == 32) { // if user enters a space
            checkMatch()
            setCurrentInput("")
            setCurrentWordIndex(currentWordIndex + 1)
        }
        
        // console.log(event.key)
    }

    const checkMatch = () => {
        const wordToCompare = words[currentWordIndex]
        if (wordToCompare === currentInput.trim()) {
            setCorrect(correct + 1)
        } else {
            setIncorrect(incorrect + 1)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-center items-center gap-2 text-gray-400 text-md">
                <FaGlobeAmericas />
                <div className="">
                    {"english"}
                </div>
            </div>
            {status === "started" ?
                <div className="text-sky-400 font-extrabold text-5xl">
                    {countDown}
                </div> :
                <div className="h-[48px]" />
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

            <div className="w-full flex justify-center">
                <input disabled={status !== "started"} type="text" onKeyDown={handleKeyDown} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} ref={inputRef} className="opacity-0" />
            </div>
        </div>
    );
};

export default Words;