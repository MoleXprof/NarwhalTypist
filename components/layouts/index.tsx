import Head from 'next/head'
import Header from '../header'
import Footer from '../footer'
import Gamemodes from '../gamemodes';
import Words from '../words';
// import { useRouter } from "next/router";
import { IoMdRefresh } from "react-icons/io";
import { NUM_WORDS } from "../../pages/index"
import { generate } from 'random-words';

type HomeProps = {
	readonly words: string[], 
	readonly setWords: (arg: string | string[]) => {}
}

const HomePage = ({ words, setWords }: HomeProps) => {
    // const router = useRouter();
	// const domain = router.route.split("/");

	const resetTest = () => {
		setWords(generate(NUM_WORDS))
	}

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

			<div className='flex flex-col justify-between items-center'>
				<Header />
				<Gamemodes />
			</div>

			<div className='flex flex-col justify-center items-center'>
				<Words words={words} />

				<button type="button" className="relative group text-gray-400 hover:text-gray-500 py-10" onClick={resetTest}>
					<IoMdRefresh className="h-6 w-6" />
					<span className="mt-2 absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
						{"Restart Test"}
					</span>
				</button>
				
				{/* <div className='flex flex-row text-center justify-center gap-2'>
					<kbd className="px-3 py-1.5 text-xs font-semibold bg-gray-400 text-sky-50 border border-gray-500 rounded-lg">Shift</kbd>
					<p className='mt-1 text-gray-400'>{"+"}</p>
					<kbd className="px-3 py-1.5 text-xs font-semibold bg-gray-400 text-sky-50 border border-gray-500 rounded-lg">Enter</kbd>
					<p className='mt-1 text-gray-400'>{"to restart test"}</p>
				</div> */}
			</div>
			<Footer/>
    	</div>
    );
};

export default HomePage;