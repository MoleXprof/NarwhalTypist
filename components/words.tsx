import { useState, useEffect } from "react";
import { FaMousePointer } from "react-icons/fa";

type WordsProps = {
    readonly words: string[]
}

const Words = ({ words }: WordsProps) => {
    const [isFocused, setIsFocused] = useState(true);
    const [countDown, setCountDown] = useState(30);
    const [currentInput, setCurrentInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        if (typeof document === "undefined") return; // Ensure client-side execution

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
    }, []);

    const startTest = () => {
        let interval = setInterval(() => {
            setCountDown((prevCountDown) => {
                if (prevCountDown === 0) {
                    clearInterval(interval);
                } else {
                    return prevCountDown - 1;
                }
            })
        }, 1000);
    }

    const handleKeyDown = ({keyCode}) => {
        if (keyCode == 32) { // if user enters a space
            checkMatch()
            setCurrentInput("")
            setCurrentWordIndex(currentWordIndex + 1)
        }
        
        // console.log(event.key)
    }

    const checkMatch = () => {
        const wordToCompare = words[currentWordIndex]
        const doesItMatch = wordToCompare === currentInput.trim()
        console.log({doesItMatch})
    }

    return (
        <div className="w-full">
            <button className="bg-sky-400 text-sky-50 rounded-lg py-2 px-3" onClick={startTest}>
                {"Start"}
            </button>
            <input type="text" onKeyDown={handleKeyDown} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
            <div className="text-sky-400 font-extrabold text-5xl">
                {countDown}
            </div>
            <div className="relative w-full">
                <div className={`w-full flex flex-wrap gap-2 justify-start items-center text-gray-400 ${isFocused ? "" : "blur"}`}>
                    {words.map((word, index) => (
                        <div key={index} className="flex">
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
    );
};

export default Words;