import { useEffect, useState } from "react";
import { generate } from "random-words";
import HomePage from "../../narwhaltypist/components/layouts/index";

export const NUM_WORDS = 200;

const Home = () => {
	const [words, setWords] = useState([]);

	useEffect(() => {
		setWords(generate(NUM_WORDS));
	}, []);

  	return (
		<div>
			<HomePage words={words} setWords={setWords} />
		</div>
	);
};

export default Home;