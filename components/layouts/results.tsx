import Head from 'next/head'
import Footer from "../footer";
import Header from "../header";
import { RiArrowDropRightLine } from "react-icons/ri";
import Link from 'next/link';

type ResultsPage = {
    readonly correct: number;
    readonly incorrect: number;
}

const ResultsPage = ({ correct, incorrect }: ResultsPage) => {
    return (
        <div className='bg-sky-150 dark:bg-dark-bg h-screen w-full px-20 flex flex-col justify-between'>
            <Head>
                <title>{"Results | NarwhalTypist"}</title>
                <meta name="title" content="About | NarwhalTypist" />
                <meta
                name="description"
                content="Description about NarwhalTypist and how it got created"
                />
                <link rel="shortcut icon" href="/images/narwhal.jpg" />
            </Head>

            <Header />
            
            {/* stats from test */}
            <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex flex-col items-start w-full gap-10 pb-10'>
                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-3xl font-bold'>{"wpm"}</h2>
                        <p className='text-sky-400 dark:text-dark-highlight font-extrabold text-7xl'>{correct ?? 0}</p>
                    </div>

                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-3xl font-bold'>{"acc"}</h2>
                        <div className='flex gap-2 text-sky-400 dark:text-dark-highlight font-extrabold text-7xl'>
                            <p>{Math.round(correct / (correct + incorrect) * 100)}</p>
                            <p>{"%"}</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between w-full'>
                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-xl font-semibold'>{"time"}</h2>
                        <p className='text-sky-200 dark:text-dark-highlight font-extrabold text-3xl'>{"30"}</p>
                    </div>
                    
                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-xl font-semibold'>{"raw"}</h2>
                        <p className='text-sky-200 dark:text-dark-highlight font-extrabold text-3xl'>{"32"}</p>
                    </div>

                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-xl font-semibold'>{"consistency"}</h2>
                        <p className='text-sky-200 dark:text-dark-highlight font-extrabold text-3xl'>{"80%"}</p>
                    </div>

                    <div>
                        <h2 className='text-gray-400 dark:text-dark-text text-xl font-semibold'>{"characters"}</h2>
                        <p className='text-sky-200 dark:text-dark-highlight font-extrabold text-3xl'>{"0/10"}</p>
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <Link className="relative group text-gray-400 hover:text-gray-500 dark:text-dark-highlight dark:hover:text-dark-highlight-highlight py-10" href="/">
                        <RiArrowDropRightLine className="h-9 w-9" />
                        <span className="mt-2 absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                            {"Next Test"}
                        </span>
                    </Link>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ResultsPage;